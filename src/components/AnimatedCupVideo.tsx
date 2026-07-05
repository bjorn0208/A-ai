import React, { useState } from "react";
import { Play, Pause, RefreshCw, Volume2, Video, Info } from "lucide-react";

export default function AnimatedCupVideo() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-black border-4 border-[#C147E9]/40 shadow-2xl shadow-[#C147E9]/20 group">
      
      {/* Video Framing Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A0D911] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#A0D911] font-bold">
            ESPAÇO DE VÍDEO PRONTO DE REVENDA
          </span>
        </div>
        <span className="bg-white/15 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider text-white">
          4K UHD commercial.mp4
        </span>
      </div>

      {/* Actual video placeholder block */}
      <div className="relative aspect-video w-full min-h-[320px] sm:min-h-[380px] bg-gradient-to-tr from-[#2D033B] via-[#4B0082] to-[#810CA8] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        
        {/* Animated fluid blob simulation background - represents the raw premium Açaí flowing */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#C147E9] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#A0D911] rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        {/* Beautiful Glass-morphic Cup simulation showing premium frozen layers and sprinkles */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Slices of strawberries and bananas falling - represent active CGI animations */}
          {isPlaying && (
            <div className="absolute -top-16 inset-x-0 h-44 pointer-events-none overflow-hidden">
              <span className="absolute animate-bounce text-2xl left-10 delay-100">🍓</span>
              <span className="absolute animate-bounce text-xl right-12 delay-700">🍌</span>
              <span className="absolute animate-bounce text-2xl left-1/2 -translate-x-12 delay-300">🍓</span>
              <span className="absolute animate-pulse text-sm bg-amber-500 rounded-full w-2 h-2 left-6 bottom-4" />
              <span className="absolute animate-pulse text-sm bg-yellow-400 rounded-full w-3 h-3 right-8 bottom-10" />
            </div>
          )}

          {/* Cup graphic wrapper */}
          <div className="w-36 h-48 bg-white/10 backdrop-blur-md rounded-t-[30px] rounded-b-[15px] border-2 border-white/20 relative overflow-hidden flex flex-col shadow-2xl transform hover:scale-105 transition-all duration-500">
            {/* Dark Purple Açaí mass inside */}
            <div className="w-full h-[80%] bg-gradient-to-b from-[#250130] to-[#14001b] relative flex flex-col items-center justify-center">
              
              {/* White whipped milk nest representing toppings */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-yellow-50/20 blur-[1px] rounded-full" />
              
              {/* Embedded fruits */}
              <span className="absolute top-10 left-3 text-lg">🍓</span>
              <span className="absolute top-20 right-3 text-lg">🍌</span>

              {/* Dynamic shining star */}
              <div className="w-12 h-12 rounded-full bg-[#A0D911]/30 flex items-center justify-center animate-pulse">
                <Video className="w-6 h-6 text-[#A0D911]" />
              </div>
              <p className="text-[10px] tracking-widest font-black text-white/95 mt-2 uppercase">AÇAÍ GO</p>
            </div>
            
            {/* Plastic cup base */}
            <div className="w-full h-[20%] bg-white/20 flex items-center justify-center border-t border-white/10">
              <span className="text-[9px] font-mono text-white/60 font-bold uppercase tracking-widest">300ml - 500ml - 1L</span>
            </div>
          </div>

          <div className="mt-5 max-w-sm">
            <h4 className="text-white font-black text-lg tracking-tight leading-tight flex items-center justify-center gap-1.5 uppercase italic">
              Seu Vídeo Animado Aqui!
            </h4>
            <p className="text-xs text-white/70 mt-1">
              Copie seu vídeo <code className="bg-black/35 px-1 rounded text-pink-400">.mp4</code> para a pasta assets e substitua este espaço pronto na sua aplicação.
            </p>
          </div>
        </div>

        {/* Video Bottom Shadow and styling */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/50 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-[#A0D911] text-[#2D033B] flex items-center justify-center hover:bg-white transition-colors"
              title={isPlaying ? "Pausar" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <span className="text-[10px] font-mono text-white/80">00:15 / 00:30</span>
          </div>

          <span className="text-[10px] font-mono text-[#A0D911] flex items-center gap-1 font-bold">
            <Volume2 className="w-3.5 h-3.5" /> COM ÁUDIO
          </span>
        </div>
      </div>

      {/* Instructions Overlay for editing */}
      <div className="bg-[#1D0926]/90 p-3 px-4 border-t border-white/10 text-xs flex gap-2 items-start justify-between">
        <div className="flex gap-2 text-zinc-300">
          <Info className="w-4 h-4 text-[#A0D911] shrink-0 mt-0.5" />
          <p className="font-sans leading-relaxed text-[11px]">
            <strong>Código Pronto:</strong> O container está isolado no arquivo <code className="bg-[#2D033B] px-1 text-white text-[10px]">AnimatedCupVideo.tsx</code>. Substitua-o facilmente por uma tag de vídeo HTML5 original do seu fornecedor de mídia!
          </p>
        </div>
      </div>

    </div>
  );
}
