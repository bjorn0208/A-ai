import React, { useState } from "react";
import AnimatedCupVideo from "./components/AnimatedCupVideo";
import { MenuItem, CartItem } from "./types";
import { 
  Flame, 
  Sparkles, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Check, 
  Settings, 
  Smartphone,
  MapPin,
  Clock,
  HelpCircle,
  Truck,
  Layers,
  CheckCircle,
  Info
} from "lucide-react";

export default function App() {
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState<string>("");

  // Customer checkout state
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Dinheiro");
  const [changeFor, setChangeFor] = useState<string>("");

  // Active Category state
  const [activeTab, setActiveTab] = useState<'all' | 'açai' | 'combos' | 'adicionais'>('all');

  // Toppings customization modal / state
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [selectedBaseItem, setSelectedBaseItem] = useState<MenuItem | null>(null);
  const [chosenCupSize, setChosenCupSize] = useState<string>("500ml");
  const [chosenToppings, setChosenToppings] = useState<string[]>([]);

  // Menu database containing highly retail-focused delicious açaí offerings and toppings
  const menu: MenuItem[] = [
    {
      id: "acai-taca-super",
      name: "Copo de Açaí Tradicional",
      description: "Monte o seu copo perfeito. Escolha o tamanho e injete seus acompanhamentos prediletos na hora do pedido.",
      price: 12.00, // base price for small, we will update depending on size!
      category: "açai",
      image: "🍇",
      sizeInput: true
    },
    {
      id: "kit-atacado-10l",
      name: "Caixa Atacado Açaí Premium 10 Litros",
      description: "Perfeito para buffet, sorveterias e revendedores. Super cremoso, estabilizado para não derreter rápido e livre de cristais de gelo.",
      price: 110.00,
      category: "açai",
      image: "📦"
    },
    {
      id: "kit-atacado-5l",
      name: "Balde de Açaí Tradicional 5 Litros",
      description: "Tamanho ideal para eventos familiares ou micro-empreendedores de final de semana. Cremosidade com toque de guaraná.",
      price: 65.00,
      category: "açai",
      image: "🪣"
    },
    {
      id: "combo-verao",
      name: "Combo Verão Turbinado",
      description: "Copo Gigante de 700ml montado com abundância de morango fresco fatiado, rodelas de banana madura, granola de castanhas e muito leite condensado.",
      price: 24.50,
      category: "combos",
      image: "🍓"
    },
    {
      id: "combo-ninho",
      name: "Instante Ninho & Nutella Supreme",
      description: "Copo de 500ml montado em camadas intercaladas com leite condensado cremoso, leite em pó Ninho puro e calda quente de creme de avelã trufada.",
      price: 19.90,
      category: "combos",
      image: "🥛"
    },
    {
      id: "combo-fit",
      name: "Copo Saudável Granola & Mel",
      description: "Copo de 400ml de açaí puro batido sem xarope de guaraná de alta caloria, acompanhado de fatias de banana fresca, granola integral e fio de mel silvestre.",
      price: 16.00,
      category: "combos",
      image: "🍯"
    },
    {
      id: "creme-avelas",
      name: "Balde Recarga Creme de Avelã 1kg",
      description: "Creme de avelã original italiano para você caprichar na montagem de sua açaíteria comercial.",
      price: 48.00,
      category: "adicionais",
      image: "🍫"
    },
    {
      id: "creme-ninho-balde",
      name: "Creme Recheio Leite Ninho Trufado 1kg",
      description: "Creme de colher ultra cremoso de Ninho para colocar nas paredes do copo, aumentando as vendas unicamente.",
      price: 39.90,
      category: "adicionais",
      image: "🍦"
    },
    {
      id: "granola-castanhas",
      name: "Fardo Granola Crocante de Castanha-do-Pará 1kg",
      description: "Granola assada no forno a lenha, super crocante e enriquecida com amêndoas e castanha triturada.",
      price: 18.00,
      category: "adicionais",
      image: "🌾"
    }
  ];

  const toppingsList = [
    "🍓 Morango Fresco (+R$ 2,50)",
    "🍌 Banana em Rodelas (+R$ 1,50)",
    "🥛 Leite Ninho em Pó (+R$ 2,00)",
    "🍯 Leite Condensado (+R$ 2,00)",
    "🌾 Granola Crocante (+R$ 1,00)",
    "🍫 Creme de Avelã (+R$ 3,00)",
    "🥥 Coco Ralado Fino (+R$ 1,50)",
    "🍬 Confetes de Chocolate (+R$ 2,00)"
  ];

  const filteredMenu = activeTab === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeTab);

  // Cart operations
  const addToCartDirect = (item: MenuItem) => {
    // If it requires customization (like selecting size or extra toppings), open customization modal!
    if (item.sizeInput) {
      setSelectedBaseItem(item);
      setChosenCupSize("500ml");
      setChosenToppings([]);
      setIsCustomizing(true);
      return;
    }

    // Otherwise, add directly
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const handleCustomizationAndAdd = () => {
    if (!selectedBaseItem) return;

    // Calculate final price based on selected size
    let finalPrice = selectedBaseItem.price; // 300ml base price = 12.00
    if (chosenCupSize === "500ml") finalPrice = 16.00;
    if (chosenCupSize === "1 Litro") finalPrice = 28.00;

    // Add extra topping costs
    chosenToppings.forEach((topping) => {
      if (topping.includes("Morango")) finalPrice += 2.50;
      if (topping.includes("Banana")) finalPrice += 1.50;
      if (topping.includes("Ninho")) finalPrice += 2.00;
      if (topping.includes("Condensado")) finalPrice += 2.00;
      if (topping.includes("Granola")) finalPrice += 1.00;
      if (topping.includes("Avelã")) finalPrice += 3.00;
      if (topping.includes("Coco")) finalPrice += 1.50;
      if (topping.includes("Confetes")) finalPrice += 2.00;
    });

    const uniqueId = `${selectedBaseItem.id}-${chosenCupSize}-${chosenToppings.map(t => t[0]).join('')}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === uniqueId);
      if (existing) {
        return prev.map((i) => i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [
        ...prev,
        {
          id: uniqueId,
          name: `${selectedBaseItem.name} (${chosenCupSize})`,
          price: finalPrice,
          quantity: 1,
          selectedSize: chosenCupSize,
          addedToppings: [...chosenToppings]
        }
      ];
    });

    setIsCustomizing(false);
    setSelectedBaseItem(null);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const qty = item.quantity + change;
          return qty > 0 ? { ...item, quantity: qty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleToppingSelection = (topping: string) => {
    setChosenToppings((prev) => 
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    );
  };

  // Compute Total Cost
  const totalCost = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Send beautifully formatted structured order to WhatsApp
  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Por favor, adicione pelo menos um item de açaí no carrinho!");
      return;
    }

    if (!clientName.trim() || !clientPhone.trim() || !clientAddress.trim()) {
      alert("Por favor, preencha as informações obrigatórias para entrega do açaí!");
      return;
    }

    // Build the formatted textual message for WhatsApp
    let messageText = `*🧁 NOVO PEDIDO - AÇAÍ SUPREMA REVENDA*\n`;
    messageText += `====================================\n\n`;
    messageText += `*👤 CLIENTE:* ${clientName.trim()}\n`;
    messageText += `*📞 CONTATO:* ${clientPhone.trim()}\n`;
    messageText += `*📍 ENDEREÇO DE ENTREGA:* ${clientAddress.trim()}\n`;
    messageText += `*💳 MÉTODO DE PAGAMENTO:* ${paymentMethod}\n`;
    
    if (paymentMethod === "Dinheiro" && changeFor.trim()) {
      messageText += `*💵 PRECISA DE TROCO PARA:* R$ ${changeFor.trim()}\n`;
    }

    if (orderNote.trim()) {
      messageText += `*📝 OBSERVAÇÕES:* ${orderNote.trim()}\n`;
    }

    messageText += `\n*🛍️ ITENS DO PEDIDO:*\n`;
    
    cart.forEach((item, index) => {
      messageText += `\n*${index + 1}. ${item.quantity}x ${item.name}* - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
      if (item.addedToppings && item.addedToppings.length > 0) {
        messageText += `   _Adicionais:_ ${item.addedToppings.join(", ")}\n`;
      }
    });

    messageText += `\n====================================\n`;
    messageText += `*💸 VALOR TOTAL:* R$ ${totalCost.toFixed(2)}\n\n`;
    messageText += `*🕒 STATUS:* Enviado diretamente pelo site de pedido rápido. Aguardo confirmação e prazo estimativo comercial no chat! 🚀`;

    // Format WhatsApp Link
    // We target a default sample wholesale vendor WhatsApp number: 5543999999999 (can be dynamically replaced or configured)
    const phoneNumberInput = "5543999999999"; 
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumberInput}&text=${encodedText}`;

    // Open standard browser redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div id="vibrant-wholesale-app" className="min-h-screen bg-[#2D033B] text-white font-sans selection:bg-[#A0D911] selection:text-[#2D033B] overflow-x-hidden">
      
      {/* BACKGROUND ATMOSPHERIC GLOWS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C147E9] rounded-full blur-[140px] opacity-15 pointer-events-none z-0" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[550px] bg-[#810CA8] rounded-full blur-[160px] opacity-15 pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#A0D911] rounded-full blur-[200px] opacity-10 pointer-events-none z-0" />

      {/* HEADER SECTION WITH DESIGN SYSTEM PARITY */}
      <nav id="navbar-brand" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C147E9] rounded-full flex items-center justify-center shadow-lg shadow-[#C147E9]/30">
            <Flame className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter italic block leading-none">
              AÇAÍ <span className="text-[#A0D911]">REVENDA</span>
            </span>
            <span className="text-[9px] text-[#A0D911] uppercase tracking-widest font-mono font-bold block mt-0.5">Cardápio & Delivery Direto</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-7 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <a href="#hero-action-section" className="text-white hover:text-[#A0D911] transition-colors">Vídeo Comercial</a>
          <a href="#product-catalog" className="text-white hover:text-[#A0D911] transition-colors">Cardápio do Dia</a>
          <a href="#cart-section" className="text-white hover:text-[#A0D911] transition-colors bg-purple-950 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-purple-800">
            <ShoppingCart className="w-4 h-4 text-[#A0D911]" />
            <span>Meu Carrinho ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </a>
        </div>

        <a 
          href="#product-catalog"
          className="px-6 py-2.5 bg-[#A0D911] text-[#2D033B] font-black uppercase text-xs tracking-wider rounded-full hover:bg-white hover:shadow-lg hover:shadow-[#A0D911]/30 transition-all duration-300 transform hover:scale-105 shrink-0"
        >
          Ir Para o Cardápio
        </a>
      </nav>

      {/* HERO SECTION DECORATED FOR VIBRANT PALETTE FOR RETELLING */}
      <header id="hero-action-section" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text branding */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#810CA8]/80 text-[#A0D911] border border-fuchsia-800/40 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-[#A0D911] animate-spin" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.15em]">Espaço Com Áudio & Ultra Cremosidade</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black leading-none tracking-tighter">
              REVENDA <br/>
              <span className="text-[#A0D911] underline decoration-[#C147E9] decoration-dashed">SABOR,</span> <br/>
              LUCRO REAL.
            </h1>
            
            <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
              Monte seu copo sob medida ou adquira nossas famosas caixas e baldes de açaí de atacado industrial de 10 Litros. Tenha um atendimento express via WhatsApp com nosso formulário inteligente integrado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-3">
              <a 
                href="#product-catalog"
                className="px-8 py-4 bg-[#A0D911] text-center text-[#2D033B] text-base font-black uppercase tracking-wider rounded-2xl shadow-xl shadow-[#A0D911]/20 hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
              >
                MONTAR MEU PEDIDO AGORA 🍇
              </a>
            </div>

            {/* Quick USP points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-white/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#A0D911]" />
                <span>Pedido direto no WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#A0D911]" />
                <span>Montagem 100% Livre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#A0D911]" />
                <span>Preços Exclusivos Atacado</span>
              </div>
            </div>
          </div>

          {/* Reserved Video Space Container inside Hero (O ESPAÇO PRONTO SOLICITADO PELO USUÁRIO) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative">
              {/* Vibrant Background Aura decoration matching Design HTML */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C147E9] to-[#A0D911] rounded-[40px] blur-2xl opacity-25 animate-pulse pointer-events-none" />
              
              <div className="mb-2 text-left sm:text-center lg:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A0D911] font-extrabold flex items-center gap-1 justify-center sm:justify-start">
                  <Smartphone className="w-3.5 h-3.5 animate-bounce" /> REPRODUTOR DE VÍDEO DO TOPO DA PÁGINA
                </span>
                <p className="text-zinc-400 text-xs mt-1">Este player de simulação já está programado para receber o seu vídeo animado de açaí.</p>
              </div>

              {/* Mount the placeholder custom player */}
              <AnimatedCupVideo />
            </div>
          </div>

        </div>
      </header>

      {/* THREE ICON BENTO BULLET POINTS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-[#A0D911]/20 text-[#A0D911] rounded-xl text-xl">🚚</div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide text-white">Logística Ultrarrápida</h4>
              <p className="text-xs text-white/60 mt-1">Enviamos em carros equipados com congelador de alta potência para preservar a textura inicial.</p>
            </div>
          </div>

          <div className="bg-[#810CA8]/80 text-white border border-[#C147E9]/40 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl text-xl">🍓</div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide text-[#A0D911]">Insumos Selecionados</h4>
              <p className="text-xs text-white/80 mt-1">Frutas frescas recolhidas logo pela manhã de fornecedores homologados para garantir o frescor absoluto.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-[#C147E9]/20 text-[#C147E9] rounded-xl text-xl">🟢</div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide text-white">Fácil Envio de Mensagem</h4>
              <p className="text-xs text-white/60 mt-1">Nenhum cadastro demorado! Adicione ao carrinho e dispare seu pedido detalhado diretamente para o WhatsApp do vendedor.</p>
            </div>
          </div>

        </div>
      </section>

      {/* THE MAIN CARDÁPIO (MENU) SECTION WITH CUSTOMIZATION SYSTEM */}
      <main id="product-catalog" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        
        {/* Category filtering section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-black text-[#A0D911] uppercase tracking-widest bg-[#810CA8] px-3.5 py-1.5 rounded-full mb-3 inline-block">
            🍧 CARDÁPIO SUPREMO CONVENIÊNCIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Escolha Seus <span className="text-[#A0D911]">Produtos Preferidos</span>
          </h2>
          <p className="text-zinc-300 text-sm mt-2">
            Seja caixas industriais de 10L para sua loja ou um copo gourmet cremoso personalizado, selecione abaixo, monte os acompanhamentos e monte seu carrinho!
          </p>

          {/* Filtering Categories Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {[
              { id: 'all', label: 'Todos os Itens' },
              { id: 'açai', label: 'Bases de Açaí' },
              { id: 'combos', label: 'Combos Prontos' },
              { id: 'adicionais', label: 'Insumos Atacado' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                  activeTab === tab.id 
                    ? "bg-[#C147E9] text-white border-[#C147E9] shadow-lg shadow-[#C147E9]/20" 
                    : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic products list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#1D0926] border border-white/10 hover:border-[#C147E9] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              
              {/* Highlight badge for inputs */}
              {item.sizeInput && (
                <span className="absolute top-3 right-3 bg-[#A0D911] text-[#2D033B] text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                  CUSTOMIZÁVEL
                </span>
              )}

              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-3xl p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#C147E9]/10 transition-colors">
                    {item.image}
                  </span>
                  
                  <span className="text-xs font-mono text-[#C147E9] font-bold bg-[#810CA8]/30 px-2.5 py-1 rounded">
                    {item.category === 'açai' ? 'Base Açaí' : item.category === 'combos' ? 'Combo Especial' : 'Adicionais/Latas'}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-white group-hover:text-[#A0D911] transition-all">{item.name}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{item.description}</p>
              </div>

              {/* Price level and actions */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-mono block">Preço Base</span>
                  <p className="font-mono text-xl font-black text-white">
                    R$ {item.price.toFixed(2)}
                    {item.sizeInput && <span className="text-xs font-normal text-zinc-400"> (300ml)</span>}
                  </p>
                </div>

                <button
                  onClick={() => addToCartDirect(item)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#A0D911] text-[#2D033B] hover:bg-white transition-all transform active:scale-95 flex items-center gap-1 shadow-md"
                >
                  <Plus className="w-4 h-4 text-purple-950 font-bold" /> 
                  <span>{item.sizeInput ? "Customizar" : "Adicionar"}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* THE INTERACTIVE SHOPPING CART AND WHATSAPP BILL FORM SECTION */}
      <section id="cart-section" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDE: SHOPPING CART LISTING */}
          <div className="lg:col-span-6 bg-[#1A0124] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-purple-900 rounded-xl text-white">
                    <ShoppingCart className="w-5 h-5 text-[#A0D911]" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white uppercase italic">Seu Pedido Montado</h3>
                    <p className="text-xs text-zinc-400">Revise os insumos de açaí selecionados</p>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1 px-2 py-1 bg-red-950/40 rounded border border-red-900/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Limpar Tudo
                  </button>
                )}
              </div>

              {/* Cart contents listing tree */}
              {cart.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-sm font-semibold">Seu carrinho está vazio neste momento.</p>
                  <p className="text-xs mt-1 text-zinc-500">Escolha as deliciosas taças e kits de açaí acima para começar!</p>
                  <a 
                    href="#product-catalog" 
                    className="inline-block mt-4 text-xs font-black uppercase tracking-wider text-[#A0D911] border-b-2 border-dashed border-[#A0D911]"
                  >
                    Ver cardápio do dia
                  </a>
                </div>
              ) : (
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {cart.map((cartItem) => (
                    <div 
                      key={cartItem.id} 
                      className="bg-[#2D033B]/50 p-4 rounded-xl border border-white/5 flex items-start justify-between gap-4 scale-in"
                    >
                      <div className="text-left">
                        <span className="font-bold text-sm text-white block">{cartItem.name}</span>
                        
                        {/* Custom size selected badge */}
                        {cartItem.selectedSize && (
                          <span className="inline-block text-[9px] font-mono font-bold bg-[#C147E9]/30 text-[#C147E9] px-1.5 py-0.5 rounded mt-1 mr-1 uppercase">
                            Tamanho: {cartItem.selectedSize}
                          </span>
                        )}

                        {/* Extra toppings lists rendering */}
                        {cartItem.addedToppings && cartItem.addedToppings.length > 0 && (
                          <div className="mt-1.5">
                            <span className="text-[10px] text-zinc-400 block font-sans">Adicionais colocados:</span>
                            <p className="text-[11px] text-[#A0D911] leading-tight mt-0.5 italic">{cartItem.addedToppings.join(", ")}</p>
                          </div>
                        )}

                        <span className="text-xs font-mono font-bold text-zinc-400 block mt-2">
                          Unitário: R$ {cartItem.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity counters controls */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="font-mono text-sm font-black text-white">
                          R$ {(cartItem.price * cartItem.quantity).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(cartItem.id, -1)}
                            className="p-1 text-zinc-300 hover:text-white hover:bg-white/15 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs font-bold text-white min-w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartItem.id, 1)}
                            className="p-1 text-[#A0D911] hover:text-white hover:bg-white/15 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total value and security metrics */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-sm font-sans font-semibold text-zinc-400">Total do Pedido:</span>
                <span className="text-3xl font-mono font-black text-[#A0D911]" id="cart-total-value">
                  R$ {totalCost.toFixed(2)}
                </span>
              </div>

              <div className="p-3 bg-[#2D033B] rounded-xl border border-white/5 flex gap-2 items-center text-left">
                <Truck className="w-4 h-4 text-[#A0D911] shrink-0" />
                <p className="text-[10px] text-zinc-400 leading-normal">
                  *As entregas são agendadas de acordo com as rotas frigoríficas de cada bairro comercial. Taxas se aplicam para distâncias superiores a 15km.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: WHATSAPP DIRECT FORM CHECKOUT CONVERTER */}
          <div className="lg:col-span-6 bg-[#250031] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="p-3 bg-[#A0D911]/10 text-[#A0D911] rounded-xl">
                <Smartphone className="w-5 h-5 text-[#A0D911]" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg text-white uppercase italic">Formulário Escrito para WhatsApp</h3>
                <p className="text-xs text-zinc-400">Os dados serão empacotados em um link formatado</p>
              </div>
            </div>

            <form onSubmit={handleSendToWhatsApp} className="space-y-4 text-left">
              
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Carlos de Souza"
                  className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] placeholder-zinc-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Número do seu Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ex: (11) 99876-5432"
                  className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] placeholder-zinc-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Endereço de Entrega Completo *</label>
                <input
                  type="text"
                  required
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Ex: Rua das Américas, 450 - Centro - São Paulo SP"
                  className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] placeholder-zinc-600 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Forma de Pagamento</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] font-sans"
                  >
                    <option>Dinheiro</option>
                    <option>Pix (Envio de Comprovante)</option>
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                    <option>Cheque Empresarial (Atacado)</option>
                  </select>
                </div>

                {paymentMethod === "Dinheiro" && (
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Troco Para quanto?</label>
                    <input
                      type="text"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      placeholder="Ex: R$ 50,00 ou R$ 100,00"
                      className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-3-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] placeholder-zinc-600 font-sans"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 font-mono">Instruções ou Observações Extras</label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Ex: Por favor colocar fita de segurança na tampa, enviar talheres biodegradáveis extras."
                  rows={2}
                  className="w-full bg-[#1A0124] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#C147E9] placeholder-zinc-600 font-sans resize-none"
                />
              </div>

              <div className="bg-[#2D033B]/70 p-3.5 rounded-xl border border-[#C147E9]/20 text-[10px] text-zinc-300 leading-normal">
                💬 <strong>O que acontece ao clicar?</strong> Abre-se uma nova aba com o chat oficial de vendas e o rascunho da mensagem contendo todos os detalhes do seu carrinho de açaí pronto para ser enviado!
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-4 rounded-xl bg-[#A0D911] hover:bg-white text-[#2D033B] font-black text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#A0D911]/20 disabled:opacity-40 disabled:hover:bg-[#A0D911]"
              >
                <Send className="w-4 h-4 text-purple-950 font-bold" />
                <span>Enviar Pedido para WhatsApp</span>
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 border-t border-white/10 text-left">
        <h4 className="text-2xl font-extrabold text-center mb-8 uppercase italic tracking-tight">Dúvidas Frequentes de Pedidos</h4>
        <div className="space-y-4">
          
          <div className="p-5 rounded-2xl bg-[#1D0B26] border border-white/5">
            <h5 className="font-bold text-sm text-[#C147E9]">Como sei qual valor total e forma de frete?</h5>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Ao enviar o formulário escrito para o nosso WhatsApp, o atendente comercial de plantão analisará seu endereço de entrega e simulará os custos de frete na hora de confirmar sua entrega.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1D0B26] border border-white/5">
            <h5 className="font-bold text-sm text-[#C147E9]">Posso escolher adicionais diferentes em vários copos de açaí?</h5>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Com certeza! Você pode clicar em "Customizar" no item "Copo de Açaí Tradicional", selecionar os adicionais do primeiro copo e clicar em "Confirmar". Em seguida, repita o processo selecionando outros adicionais! Cada produto customizado entrará individualmente com seus respectivos ingredientes no carrinho.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1D0B26] border border-white/5">
            <h5 className="font-bold text-sm text-[#C147E9]">Quais as formas de pagamento aceitas em rota?</h5>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Aceitamos Pix, Dinheiro com troco programado e cartões de débito/crédito direto com a maquininha do motorista do caminhão ou transportador credenciado.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black/40 border-t border-white/10 text-zinc-400 py-12 text-sm text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tighter italic text-white uppercase">
                AÇAÍ <span className="text-[#A0D911]">REVENDA</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              Plataforma robusta para montagem de pedidos com envio assistido para WhatsApp. Cremosidade do Pará para sua mesa ou comércio.
            </p>
            <p className="text-[10px] font-mono text-fuchsia-400/60 font-bold">CNPJ: 45.109.813/0001-92</p>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Links do Site</h5>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li><a href="#hero-action-section" className="hover:text-[#A0D911] transition-colors">Visualizador Cabeçalho</a></li>
              <li><a href="#product-catalog" className="hover:text-[#A0D911] transition-colors">Cardápio do Insumo</a></li>
              <li><a href="#cart-section" className="hover:text-[#A0D911] transition-colors font-bold">Carrinho WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Contato Atacado</h5>
            <div className="space-y-2 text-xs text-zinc-300">
              <p>📍 São Paulo - SP / Filiais de Distribuição Integrada</p>
              <p>📧 comercial@acairevendapremium.com</p>
              <p>📞 0800 AÇAÍ COMERCIAL</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 text-center text-xs text-zinc-500">
          <p>© 2026 Açaí Revenda Suprema S/A. Todos os direitos reservados. Deixe seu vídeo comercial no espaço reservado do cabeçalho!</p>
        </div>
      </footer>


      {/* MODAL PARA CUSTOMIZAR ADICIONAIS DO COPO DE AÇAÍ */}
      {isCustomizing && selectedBaseItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 text-left">
          <div className="bg-[#1A0124] border border-purple-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="px-6 py-5 bg-[#2D033B] border-b border-white/10 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-lg text-white font-sans uppercase italic tracking-tight flex items-center gap-1.5">
                  <span>{selectedBaseItem.image}</span> Personalizar Copo de Açaí
                </h4>
                <p className="text-xs text-zinc-300">Selecione o tamanho ideal e os acompanhamentos adicionais para o copo</p>
              </div>
              <button 
                onClick={() => {
                  setIsCustomizing(false);
                  setSelectedBaseItem(null);
                }}
                className="text-zinc-400 hover:text-white px-2 py-1 rounded bg-[#2D033B] border border-white/10 text-[11px]"
              >
                Voltar [X]
              </button>
            </div>

            {/* Content to choose options */}
            <div className="p-6 space-y-6">
              
              {/* Option 1: Choose cup size */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5 font-mono">1. Escolha o Tamanho do Copo</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { size: "300ml", value: "R$ 12,00" },
                    { size: "500ml", value: "R$ 16,00" },
                    { size: "1 Litro", value: "R$ 28,00" }
                  ].map((item) => (
                    <button
                      key={item.size}
                      type="button"
                      onClick={() => setChosenCupSize(item.size)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        chosenCupSize === item.size 
                          ? "bg-[#C147E9] text-white border-[#C147E9]" 
                          : "bg-[#2D033B] text-zinc-300 border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <span className="block">{item.size}</span>
                      <span className="block text-[10px] text-white/60 font-mono font-medium mt-0.5">{item.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Multi-select toppings */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5 font-mono">2. Escolha os Adicionais de seu Gosto (Multi-seleção)</label>
                <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {toppingsList.map((topping) => {
                    const isSelected = chosenToppings.includes(topping);
                    return (
                      <button
                        key={topping}
                        type="button"
                        onClick={() => toggleToppingSelection(topping)}
                        className={`p-2 rounded-xl text-xs font-semibold transition-all border text-left flex justify-between items-center ${
                          isSelected 
                            ? "bg-[#A0D911]/25 text-[#A0D911] border-[#A0D911]" 
                            : "bg-[#2D033B] text-zinc-300 border-white/5 hover:bg-white/5"
                        }`}
                      >
                        <span>{topping}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#A0D911]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-[#2D033B] rounded-xl border border-white/5 text-[10px] text-zinc-400 leading-normal">
                💡 <strong>Preço recalculado:</strong> Os valores extras dos adicionais selecionados acima serão somados automaticamente no valor final deste copo ao adicionar ao carrinho.
              </div>

            </div>

            {/* Confirm buttons */}
            <div className="bg-[#2D033B] px-6 py-4 border-t border-white/10 flex justify-between items-center gap-4">
              <span className="text-sm font-semibold text-zinc-400">Pronto para colocar no Carrinho?</span>
              <button
                onClick={handleCustomizationAndAdd}
                className="px-6 py-2.5 bg-[#A0D911] text-[#2D033B] font-black uppercase text-xs tracking-wider rounded-xl hover:bg-white transition-all transform active:scale-95"
              >
                Confirmar Configuração ✔
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
