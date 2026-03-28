"use client";

import React, { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { StatusViewer } from "@/components/chat/StatusViewer";
import { StatusCreator } from "@/components/chat/StatusCreator";
import { GroupCreator } from "@/components/chat/GroupCreator";
import { VoiceRoom } from "@/components/chat/VoiceRoom";
import { VerticalNav } from "@/components/chat/VerticalNav";
import { VoiceTalkCreator } from "@/components/chat/VoiceTalkCreator";
import { AnimatePresence } from "framer-motion";

export default function ChatSpacePage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [showStatusCreator, setShowStatusCreator] = useState(false);
  const [showGroupCreator, setShowGroupCreator] = useState(false);
  const [showVoiceTalkCreator, setShowVoiceTalkCreator] = useState(false);
  const [showVoiceRoom, setShowVoiceRoom] = useState(false);
  const [voiceTopic, setVoiceTopic] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("chats");

  return (
    <div className="h-[calc(100vh-80px)] mb-[-32px] md:mb-[-8px] flex bg-[#0b141a] md:rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative mx-auto w-full max-w-[1600px]">
      {/* 1. Far Left Vertical Nav - Only on Desktop */}
      <div className="hidden md:block">
        <VerticalNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Middle Sidebar - HIDDEN on mobile if chat selected */}
        <div className={`${selectedChatId ? 'hidden md:flex' : 'flex w-full md:w-[320px] lg:w-[400px]'} border-r border-[#222e35]`}>
          <ChatSidebar 
            activeNavTab={activeNavTab}
            selectedChatId={selectedChatId} 
            onSelectChat={setSelectedChatId} 
            onViewStatus={() => setShowStatus(true)}
            onPostStatus={() => setShowStatusCreator(true)}
            onCreateGroup={() => setShowGroupCreator(true)}
            onStartVoiceTalk={() => setShowVoiceTalkCreator(true)}
          />
        </div>

        {/* 3. Main Chat Window - HIDDEN on mobile if no chat selected */}
        <div className={`flex-1 overflow-hidden relative ${!selectedChatId ? 'hidden md:block' : 'block'}`}>
          <ChatWindow 
            chatId={selectedChatId} 
            onStartVoiceDiscussion={() => setShowVoiceRoom(true)}
            onBack={() => setSelectedChatId(null)}
          />
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showStatus && (
          <StatusViewer onClose={() => setShowStatus(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVoiceRoom && (
          <VoiceRoom 
            topic={voiceTopic}
            onClose={() => setShowVoiceRoom(false)} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showStatus && (
          <StatusViewer onClose={() => setShowStatus(false)} />
        )}
        {showStatusCreator && (
          <StatusCreator 
            onClose={() => setShowStatusCreator(false)} 
            onSuccess={() => {
              setShowStatusCreator(false);
            }} 
          />
        )}
        {showGroupCreator && (
          <GroupCreator 
            onClose={() => setShowGroupCreator(false)} 
            onSuccess={(roomId) => {
              setSelectedChatId(roomId);
              setShowGroupCreator(false);
            }} 
          />
        )}
        {showVoiceTalkCreator && (
          <VoiceTalkCreator 
            onClose={() => setShowVoiceTalkCreator(false)}
            onSuccess={(topic) => {
              setVoiceTopic(topic);
              setShowVoiceRoom(true);
              setShowVoiceTalkCreator(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
