"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  priceOffer?: number
}

interface BargainingChatbotProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
  }
}

export function BargainingChatbot({ isOpen, onClose, product }: BargainingChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(product.price)
  const [negotiationCount, setNegotiationCount] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize conversation
      const welcomeMessage: Message = {
        id: "1",
        type: "bot",
        content: `Hi there! I'm your friendly shopping assistant. I see you're interested in the ${product.name} for $${product.price}. I'd love to help you get a great deal! What price were you thinking?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, product, messages.length])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    const priceMatch = userMessage.match(/\$?(\d+(?:\.\d{2})?)/g)
    const offeredPrice = priceMatch ? Number.parseFloat(priceMatch[0].replace("$", "")) : null

    let response = ""
    let newPrice = currentPrice

    if (offeredPrice) {
      const discountPercentage = ((product.price - offeredPrice) / product.price) * 100

      if (offeredPrice >= currentPrice * 0.95) {
        // Accept offer if it's within 5% of current price
        response = `Perfect! I can do $${offeredPrice} for you. That's a fantastic deal! Would you like me to update the price and add it to your cart?`
        newPrice = offeredPrice
      } else if (offeredPrice >= currentPrice * 0.85) {
        // Counter-offer if it's within 15% of current price
        const counterOffer = Math.round(currentPrice * 0.9 * 100) / 100
        response = `Thanks for your offer of $${offeredPrice}! While I can't go quite that low, I can offer you a special price of $${counterOffer}. That's still a great ${Math.round(((product.price - counterOffer) / product.price) * 100)}% discount! What do you think?`
        newPrice = counterOffer
      } else if (offeredPrice >= currentPrice * 0.7) {
        // Negotiate if it's within 30% of current price
        const counterOffer = Math.round(currentPrice * 0.85 * 100) / 100
        response = `I understand you're looking for a great deal! Your offer of $${offeredPrice} is quite low, but I want to help. How about $${counterOffer}? That's already a nice ${Math.round(((product.price - counterOffer) / product.price) * 100)}% off the original price!`
        newPrice = counterOffer
      } else {
        // Reject if too low
        response = `I appreciate your interest, but $${offeredPrice} is below what I can offer. The best I can do is $${Math.round(currentPrice * 0.8 * 100) / 100}. This product has great features and excellent reviews. Would you consider this price?`
        newPrice = Math.round(currentPrice * 0.8 * 100) / 100
      }
    } else if (
      lowerMessage.includes("lowest") ||
      lowerMessage.includes("best price") ||
      lowerMessage.includes("discount")
    ) {
      const bestPrice = Math.round(product.price * 0.85 * 100) / 100
      response = `I can offer you our best price of $${bestPrice} for the ${product.name}. That's a ${Math.round(((product.price - bestPrice) / product.price) * 100)}% discount! This is a special offer just for you.`
      newPrice = bestPrice
    } else if (lowerMessage.includes("yes") || lowerMessage.includes("accept") || lowerMessage.includes("deal")) {
      response = `Excellent! I'm updating the price to $${currentPrice}. You're getting a great deal! Would you like me to add this to your cart now?`
    } else if (lowerMessage.includes("no") || lowerMessage.includes("too high") || lowerMessage.includes("expensive")) {
      const newOffer = Math.round(currentPrice * 0.95 * 100) / 100
      response = `I understand. Let me see what I can do... How about $${newOffer}? I really want to make this work for you!`
      newPrice = newOffer
    } else {
      // General responses
      const responses = [
        `I'm here to help you get the best deal on the ${product.name}. What price point were you thinking?`,
        `This product is really popular and has great reviews. What would make this purchase perfect for you?`,
        `I want to make sure you're happy with your purchase. What's your budget for this item?`,
        `Let me know what you're comfortable spending, and I'll see what I can do!`,
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
    }

    setCurrentPrice(newPrice)
    setNegotiationCount((prev) => prev + 1)

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      priceOffer: newPrice !== currentPrice ? newPrice : undefined,
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate assistant thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleAcceptDeal = () => {
    toast({
      title: "Deal accepted!",
      description: `Price updated to $${currentPrice}. Adding to cart...`,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            Shopping Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Price Display */}
          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-b">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">Current Offer</p>
              <p className="text-2xl font-bold text-green-600">${currentPrice}</p>
              {currentPrice < product.price && (
                <p className="text-sm text-gray-500">
                  You save ${(product.price - currentPrice).toFixed(2)} (
                  {Math.round(((product.price - currentPrice) / product.price) * 100)}% off)
                </p>
              )}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "bot" && <Bot className="w-4 h-4 mt-0.5 text-orange-600" />}
                      {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.priceOffer && (
                          <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700" onClick={handleAcceptDeal}>
                            Accept ${message.priceOffer}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-orange-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message or price offer..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Try: "What's your best price?" or "I can pay $250"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
