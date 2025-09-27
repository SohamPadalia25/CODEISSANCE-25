"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, CSSProperties, useEffect } from "react"
import { Send, Bot, MessageCircle, Mic, Settings, Maximize2, Volume2 } from "lucide-react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: "100vh",
    backgroundColor: "",
    padding: "8px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 8px auto",
    flexShrink: 0,
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0",
    padding: "8px 0",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    position: "relative",
  },
  avatarIcon: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #0c9651, #00aa55)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 205, 102, 0.3)",
  },
  statusDot: {
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    width: "12px",
    height: "12px",
    backgroundColor: "#0c9651",
    borderRadius: "50%",
    border: "2px solid #000",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0c9651",
    margin: "0 0 2px 0",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: "12px",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusDotSmall: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#0c9651",
  },
  statusText: {
    fontSize: "10px",
    color: "#9ca3af",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  chatCard: {
    backgroundColor: "#111827",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(255, 255, 255, 0.91)",
    border: "2px solid #0c9651",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  chatHeader: {
    background: "linear-gradient(135deg, #006633, #008844)",
    color: "white",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "40px",
    flexShrink: 0,
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  chatHeaderIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "6px",
    borderRadius: "8px",
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: "14px",
    fontWeight: 600,
    margin: "0 0 2px 0",
  },
  chatHeaderSubtitle: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  chatHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "white",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatBody: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    backgroundColor: "#000",
  },
  avatarContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  chatInput: {
    padding: "12px 16px",
    borderTop: "1px solid #0c9651",
    backgroundColor: "#111827",
    minHeight: "80px",
    flexShrink: 0,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    border: "1px solid #0c9651",
    borderRadius: "12px",
    padding: "8px 40px 8px 12px",
    fontSize: "14px",
    resize: "none",
    minHeight: "36px",
    maxHeight: "36px",
    outline: "none",
    transition: "all 0.2s ease",
    backgroundColor: "#1f2937",
    color: "#fff",
    boxShadow: "0 1px 3px rgb(243, 238, 238)",
  },
  micButton: {
    position: "absolute",
    right: "6px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#9ca3af",
    transition: "all 0.2s ease",
  },
  sendButton: {
    backgroundColor: "#0c9651",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    height: "36px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  suggestionButton: {
    fontSize: "11px",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    border: "1px solid #0c9651",
    borderRadius: "16px",
    padding: "4px 8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
}

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("connected")

  useEffect(() => {
    // Add the HeyGen script to the document
    const script = document.createElement('script');
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbm5fRG9jdG9yX1NpdHRpbmdfcHVibGlj%0D%0AIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMvMjZkZTM2%0D%0AOWIyZDQ0NDNlNTg2ZGVkZjI3YWYxZTBjMWRfNDU1NzAvcHJldmlld190YWxrXzEud2VicCIsIm5l%0D%0AZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiZGVtby0xIiwidXNl%0D%0Acm5hbWUiOiJiNWM0MTdiZWQzN2I0ZDYzYjBjOTRiNjkwMTZiZmQ2NyJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\\n  #heygen-streaming-embed {\\n    z-index: 9999;\\n    position: relative;\\n    width: 100%;\\n    height: 100%;\\n    border-radius: 8px;\\n    border: 2px solid #0c9651;\\n    box-shadow: 0px 8px 24px 0px rgba(0, 205, 102, 0.3);\\n    transition: all linear 0.1s;\\n    overflow: hidden;\\n    opacity: 1;\\n    visibility: visible;\\n  }\\n  #heygen-streaming-embed.expand {\\n    position: fixed;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    width: 80vw;\\n    height: 80vh;\\n    z-index: 10000;\\n  }\\n  #heygen-streaming-container {\\n    width: 100%;\\n    height: 100%;\\n  }\\n  #heygen-streaming-container iframe {\\n    width: 100%;\\n    height: 100%;\\n    border: 0;\\n  }\\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!0;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.getElementById("heygen-container")?.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
      // Also remove the HeyGen embed element if it exists
      const embed = document.getElementById('heygen-streaming-embed');
      if (embed && embed.parentNode) {
        embed.parentNode.removeChild(embed);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return
    // Add logic for sending messages here
    setInput("")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    const embed = document.getElementById('heygen-streaming-embed');
    if (embed) {
      embed.classList.toggle('expand', !isFullscreen);
    }
  }

  const suggestionPrompts = [
    "How often can I donate blood?",
    "What are the eligibility requirements for blood donation?",
    "How do I prepare for a blood donation?",
    "What types of blood donations are there?",
    "Where can I find nearby blood donation centers?",
    "What is the recovery process after donation?",
    "Can I donate if I have a medical condition?",
    "How does organ donation registration work?",
    "What's the difference between whole blood and platelet donation?",
    "How long does the blood donation process take?",
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Aarogya Mitra AI Assistant
              </h1>
              <p className="text-muted-foreground">
                Your personalized healthcare companion for blood and organ donation queries.
              </p>
            </div>

            <div style={styles.container}>
              {/* Header */}
              <div style={styles.header}>
                <div style={styles.headerTop}>
                  <div style={styles.headerLeft}>
                    <div style={styles.avatar}>
                      <div style={styles.avatarIcon}>
                        <Bot size={28} color="white" />
                      </div>
                      <div style={styles.statusDot}></div>
                    </div>
                    <div>
                      <h1 style={styles.title}>Aarogya Mitra</h1>
                      <p style={styles.subtitle}>
                        Your personalized healthcare companion powered by Aarogya Mitra
                      </p>
                    </div>
                  </div>

                  <div style={styles.headerRight}>
                    <div style={styles.statusIndicator}>
                      <div style={styles.statusDotSmall}></div>
                      <span style={styles.statusText}>{connectionStatus}</span>
                    </div>
                    <button style={styles.headerButton}>
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Chat */}
              <div style={styles.mainContainer}>
                <div style={styles.chatCard}>
                  <div style={styles.chatHeader}>
                    <div style={styles.chatHeaderLeft}>
                      <div style={styles.chatHeaderIcon}>
                        <MessageCircle size={20} />
                      </div>
                      <div style={styles.chatHeaderText}>
                        <h2 style={styles.chatHeaderTitle}>Real-Time AI Assistant</h2>
                        <p style={styles.chatHeaderSubtitle}>
                          Powered by Aarogya Mitra • Real-time Healthcare Assistance
                        </p>
                      </div>
                    </div>

                    <div style={styles.chatHeaderRight}>
                      <button 
                        style={styles.headerButton}
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button 
                        style={styles.headerButton}
                        onClick={toggleFullscreen}
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={styles.chatBody}>
                    <div style={styles.avatarContainer} id="heygen-container">
                      {/* HeyGen avatar will be injected here by the script */}
                    </div>
                  </div>

                  <div style={styles.chatInput}>
                    <div style={styles.inputContainer}>
                      <div style={styles.inputWrapper}>
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Ask your blood and organ donation questions here..."
                          style={styles.textarea}
                        />
                        <button 
                          style={styles.micButton}
                          onClick={() => setIsListening(!isListening)}
                        >
                          <Mic size={16} color={isListening ? "#0c9651" : "#9ca3af"} />
                        </button>
                      </div>
                      <button 
                        style={styles.sendButton} 
                        onClick={handleSendMessage}
                        disabled={!input.trim()}
                      >
                        <Send size={18} />
                        Send
                      </button>
                    </div>
                    <div style={styles.suggestions}>
                      {suggestionPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(prompt)}
                          style={styles.suggestionButton}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AIAssistant