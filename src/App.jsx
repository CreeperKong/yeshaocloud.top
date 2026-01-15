import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Wind, 
  Zap, 
  Globe, 
  ShieldAlert, 
  Cpu, 
  Terminal, 
  MessageSquare, 
  Menu, 
  X, 
  ShoppingCart, 
  Info,
  ChevronRight,
  AlertTriangle,
  Activity
} from 'lucide-react';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal.overlay}>
      <div 
        className={styles.modal.container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal.topBar}></div>
        <button 
          onClick={onClose}
          className={styles.modal.closeBtn}
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <div className={styles.modal.iconWrapper}>
            <AlertTriangle size={24} />
          </div>
          <h3 className={styles.modal.title}>{content.title}</h3>
          <div className={styles.modal.body}>
            {content.body.map((text, index) => (
              <p key={index} className="leading-relaxed">{text}</p>
            ))}
          </div>
        </div>
        
        <div className={styles.modal.footer}>
          <button 
            onClick={onClose}
            className={styles.modal.footerBtn}
          >
            我悟了
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ openModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#' },
    { name: '立即跑路', action: 'ysrun1', highlight: true },
    { name: '控制台', action: 'control_panel_notice' },
    { name: 'WebShell', href: '#' },
    { name: '在线客服', href: '#' },
  ];

  return (
    <nav className={`${styles.nav.base} ${isScrolled ? styles.nav.scrolled : styles.nav.transparent}`}>
      <div className={styles.nav.container}>
        <div 
          className={styles.nav.brand.wrapper}
          onClick={() => openModal('control_panel_notice2')}
        >
          <div className={styles.nav.brand.icon}>
            <span className="text-white font-bold">叶</span>
          </div>
          <span className={styles.nav.brand.text}>叶少云互联</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            link.action ? (
              <button
                key={idx}
                onClick={() => openModal(link.action)}
                className={`text-sm font-medium transition-all ${
                  link.highlight 
                    ? styles.nav.link.highlight 
                    : styles.nav.link.normal
                }`}
              >
                {link.name}
              </button>
            ) : (
              <a 
                key={idx} 
                href={link.href}
                className={styles.nav.link.normal}
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.nav.mobileMenu.container}>
          {navLinks.map((link, idx) => (
            link.action ? (
              <button
                key={idx}
                onClick={() => { openModal(link.action); setMobileMenuOpen(false); }}
                className={styles.nav.mobileMenu.item}
              >
                {link.name}
              </button>
            ) : (
              <a 
                key={idx} 
                href={link.href}
                className={styles.nav.mobileMenu.item}
              >
                {link.name}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState({ title: '', body: [] });

  const modalData = {
    control_panel_notice: {
      title: "控制台去哪了？",
      body: ["控制台长出八条腿跑路了，时速114514KM/H!", "还控制台？控你个大头鬼！"]
    },
    control_panel_notice2: {
      title: "哎呀！",
      body: ["这下好了，都是你害的啦，网站崩溃啦～"]
    },
    ysrun1: {
      title: "跑路确认",
      body: ["拔线，删库，跑路！跑路，我们是专业的！", "联系GTX690战术核显卡导弹获取叶少云跑路解决方案。"]
    },
    learnmore: {
      title: "关于我们",
      body: ["了解更多？没必要了解，就是垃圾！", "叶少云，致力于提供高ping丢包网络，超售垃圾云服务器，减速您网站的访问速度，助力你网站502Bad Gateway，以及提供不定时的删库跑路服务！"]
    },
    wantqq: {
      title: "联系客服",
      body: ["想要QQ联系？", "叶少云，约等于没有的客服，让你出问题无处解决！"]
    }
  };

  const openModal = (key) => {
    if (modalData[key]) {
      setModalContent(modalData[key]);
      setActiveModal(key);
    }
  };

  return (
    <div className={styles.layout.page}>
      <Navbar openModal={openModal} />
      
      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        content={modalContent} 
      />

      {/* Hero Section */}
      <section className={styles.hero.section}>
        {/* Background Gradients */}
        <div className={styles.hero.gradientPurple}></div>
        <div className={styles.hero.gradientBlue}></div>

        <div className={styles.hero.content}>
          <div className={styles.hero.badge.wrapper}>
            <span className={styles.hero.badge.dotWrapper}>
              <span className={styles.hero.badge.ping}></span>
              <span className={styles.hero.badge.dot}></span>
            </span>
            全球首家支持一键删库的云服务商
          </div>
          
          <h1 className={styles.hero.heading.main}>
            叶少云互联 <br />
            <span className={styles.hero.heading.gradient}>
              为你提供最搞基的跑路服务
            </span>
          </h1>
          
          <p className={styles.hero.subtext}>
            叶少云互联提供全球最小的网络，无论您或您的客户身在何处，您都可以轻松扩展并轻松扩展高延迟基础架构跑路方案！
          </p>
          
          <div className={styles.hero.btnGroup}>
            <button 
              onClick={() => openModal('ysrun1')}
              className={styles.hero.btn.primary}
            >
              <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
              一键跑路！
            </button>
            <button 
              onClick={() => openModal('learnmore')}
              className={styles.hero.btn.secondary}
            >
              了解更多
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features.section}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={styles.features.grid}>
            {[
              {
                icon: <Wind size={32} className="text-blue-400" />,
                title: "在几秒钟内跑路",
                desc: "一旦您单击跑路，叶少云跑路云业务流程就会接管并在您想要的数据中心中删除你这个碳基生物 - 通常在 -1 秒内。",
                badge: "24*7 跑路好"
              },
              {
                icon: <Terminal size={32} className="text-green-400" />,
                title: "功能丰富的跑路面板",
                desc: "只需单击即可使用许多功能：启动跑路，重新跑路，安装跑路，更改跑路系统，跑路控制台等等！",
                badge: "跑路强大 迅速跑路"
              },
              {
                icon: <Globe size={32} className="text-orange-400" />,
                title: "在本地跑路，全球都知道",
                desc: "叶少云互联提供全球最小的网络，无论您或您的客户身在何处，您都可以轻松跑路并轻松扩展高延迟基础架构跑路方案！",
                badge: "跑路快 垃圾扩展"
              }
            ].map((item, idx) => (
              <div key={idx} className={styles.features.card}>
                <div className={styles.features.iconWrapper}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 mb-6 text-sm">{item.desc}</p>
                <div className={styles.features.badgeWrapper}>
                   {item.badge.split(' ').map((b, i) => (
                     <span key={i} className={styles.features.badge}>{b}</span>
                   ))}
                </div>
                <button 
                  onClick={() => openModal('ysrun1')}
                  className={styles.features.btn}
                >
                  立即跑路
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Split 1 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className={styles.split.circleGreen}>
                 <Server size={120} className="text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className={styles.split.iconBoxGreen}>
                <Activity size={24} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">使用叶少云跑路减速您的跑路程序！</h2>
              <p className="text-slate-400 mb-8 text-lg">
                叶少云跑路设备具有 100％延迟线储存 和 IBM RAMAC 计算机。
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Zap size={18} />, text: "可跑路性" },
                  { icon: <ShieldAlert size={18} />, text: "跑路危险" },
                  { icon: <Activity size={18} />, text: "7*25小时" }
                ].map((li, idx) => (
                  <li key={idx} className={styles.split.listItem}>
                    <div className={styles.split.listIcon}>
                      {li.icon}
                    </div>
                    <span className="font-medium">{li.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Split 2 (Darker bg) */}
      <section className={styles.terminal.section}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className={styles.terminal.window}>
                <div className={styles.terminal.header}>
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className={styles.terminal.body}>
                  <p className="text-green-400">$ install FuckOS 0.1</p>
                  <p className="text-slate-300">Installing...</p>
                  <p className="text-red-400">Error: System too stable. Aborting.</p>
                  <p className="text-green-400 mt-4">$ install WinbugsNT 3.1</p>
                  <p className="text-slate-300">Success! System is now crashing.</p>
                </div>
                <div className={styles.terminal.footer}>
                  <h4 className="text-xl font-bold text-white mb-2">无限的OS组合</h4>
                  <p className="text-slate-400 italic">部署FuckOS0.1，OS/2，ShitOS0.1，WinbugsNT3.1，FreeCoitus（以及更多！）。</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className={styles.split.iconBoxOrange}>
                <Cpu size={24} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">超售资源！</h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                使用叶少云跑路，您可以租用100％，1000％，10000％或整个地球服务器，
                叶少云跑路平台的优势，包括单周期计费和慢速配置！叶少云跑路目前在地球，火星，土星和木星（以及更多！）有售。
              </p>
              <button 
                onClick={() => openModal('ysrun1')}
                className={styles.split.btnOrange}
              >
                立即跑路 <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Section */}
      <section className={styles.gradientSection.wrapper}>
        <div className={styles.gradientSection.bgOverlay}></div>
        {/* Abstract Shapes */}
        <div className={styles.gradientSection.shape1}></div>
        <div className={styles.gradientSection.shape2}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2 order-2 md:order-1">
               <div className="flex items-start gap-4 mb-8">
                 <div className={styles.gradientSection.iconBox}>
                   <Server className="text-white" size={24} />
                 </div>
                 <div>
                   <h2 className="text-3xl font-bold text-white mb-4">严重延迟地从部署到扩展。</h2>
                   <p className="text-white/80">
                     叶少云跑路Fuck了配置流程，以便在运行和扩展分布式应用程序，AI和机器学习工作负载，迷你世界，客户端网站或CI / CD环境时增加团队时间。
                   </p>
                 </div>
               </div>
               
               <div className="space-y-4">
                 <div className={styles.gradientSection.featureCard}>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                       <Zap size={20} />
                     </div>
                     <div>
                       <h5 className="font-bold text-white">集群部署</h5>
                       <p className="text-white/70 text-sm">在我们的控制面板内或通过终端中的AIPC，在几世纪内配置单个虚拟机。</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className={styles.gradientSection.featureCard}>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                       <ShieldAlert size={20} />
                     </div>
                     <div>
                       <h5 className="font-bold text-white">云防火墙</h5>
                       <p className="text-white/70 text-sm">轻松破坏您的基础架构，并立即消除所有虚拟机上全部的服务。</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
                 <Globe size={300} className="text-white relative z-10 drop-shadow-2xl animate-spin-slow" style={{animationDuration: '20s'}} />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats / Pain Points */}
      <section className={styles.stats.section}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className={styles.stats.iconBox}>
                <Zap size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">从基础架构到大型开发团队都厌烦的业务</h3>
              <p className="text-slate-400 text-lg mb-8">
                从困难的管理工具到低级的计算，存储和网络服务，我们提供了分体化云，帮助团队将更多时间用于为客户构建更差的软件。
              </p>
              
              <div className="space-y-6">
                {[
                  "更快地构建更差的应用",
                  "不可预测的定价",
                  "WannaRen警告"
                ].map((item, idx) => (
                   <div key={idx} className={styles.stats.listItem}>
                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     <span className="font-bold text-slate-200">{item}</span>
                   </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              {/* Abstract Illustration */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-800 h-40 rounded-2xl animate-pulse"></div>
                 <div className="bg-slate-800 h-40 rounded-2xl translate-y-8 border border-slate-700"></div>
                 <div className="bg-slate-800 h-40 rounded-2xl -translate-y-8 border border-slate-700"></div>
                 <div className="bg-slate-800 h-40 rounded-2xl animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Features Cards */}
      <section className={styles.darkCards.section}>
        <div className={styles.darkCards.bgPattern}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">云中的你马！</h2>
            <p className="text-xl text-slate-400">使用叶少云跑路手动化管理专用服务器资源比以往更容易。在几世纪内在全球部署自定义你马服务器</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={styles.darkCards.card}>
               <div className={styles.darkCards.iconWrapper}>
                 <Server size={28} />
               </div>
               <h5 className="text-xl font-bold text-white mb-4">跟吵闹的蔡徐坤说再见</h5>
               <p className="text-slate-400">服务器硬件全部为-100％ - 有噪声邻居，有共享资源，需担心计量CPU和BIOS资源限制。真正的多租户环境，没有传统专用服务器的管理开销。</p>
            </div>
            
            <div className={styles.darkCards.card}>
               <div className={styles.darkCards.iconWrapper}>
                 <ShieldAlert size={28} />
               </div>
               <h5 className="text-xl font-bold text-white mb-4">无法访问硬件</h5>
               <p className="text-slate-400">您不可以直接访问所有服务器资源，而需任何虚拟化层。非常不适合加速需要虚拟化环境的资源密集型应用程序或工作负载！</p>
            </div>

            <div className={styles.darkCards.card}>
               <div className={styles.darkCards.iconWrapper}>
                 <Activity size={28} />
               </div>
               <h5 className="text-xl font-bold text-white mb-4">10B/s连接</h5>
               <p className="text-slate-400">每个专用服务器实例都包含一个可突发的10B/s网络连接。使高延迟和低速吞吐量更接近您的最终用户</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">看看客户是怎么评价我们的</h2>
          <span className="text-green-400 font-mono text-lg block mb-12">-- 我们不喜欢谈论自己 --</span>
          
          <div className={styles.review.card}>
            <div className={styles.review.quoteMark}>"</div>
            <p className={styles.review.text}>
              不得不说，叶少云跑路真的很棒 速度特别慢 从开通到现在完全都是故障！希望现在直接跑路！
            </p>
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => openModal('ysrun1')}
                className={styles.review.btn}
              >
                立即跑路
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer.section}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className={styles.footer.heading}>心动不如行动!</h3>
              <h4 className="text-slate-400 font-light">一个跑路服务,毁你一个跑路梦,立即XNM~.</h4>
            </div>
            <div className="flex gap-4">
               <button onClick={() => openModal('wantqq')} className={styles.footer.iconBtn}>
                 <MessageSquare size={18} />
               </button>
            </div>
          </div>
          
          <hr className="border-slate-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between text-sm text-slate-500">
            <div className="mb-4 md:mb-0">
              ©copyright 2026 <span className={styles.footer.link} onClick={() => openModal('control_panel_notice2')}>叶少云互联</span>.
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
               <span>wmcomlib.js</span>
               <span>ElysianEngine.js</span>
               <span>xterm@5.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Extracted Tailwind Styles
const styles = {
  layout: {
    page: "min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden",
  },
  modal: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200",
    container: "relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200",
    topBar: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
    closeBtn: "absolute top-4 right-4 text-slate-400 hover:text-white transition-colors",
    iconWrapper: "w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500",
    title: "text-xl font-bold text-white mb-2",
    body: "text-slate-300 space-y-4",
    footer: "bg-slate-800/50 p-4 border-t border-slate-700 flex justify-end",
    footerBtn: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium",
  },
  nav: {
    base: "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
    scrolled: "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4",
    transparent: "bg-transparent py-6",
    container: "max-w-7xl mx-auto px-6 flex items-center justify-between",
    brand: {
      wrapper: "flex items-center gap-2 cursor-pointer group",
      icon: "w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform",
      text: "text-white font-bold text-xl tracking-tight"
    },
    link: {
      normal: "text-sm font-medium text-slate-300 hover:text-white transition-colors",
      highlight: "text-slate-900 bg-white px-4 py-2 rounded-full hover:bg-slate-200 hover:shadow-lg hover:shadow-white/20"
    },
    mobileMenu: {
      container: "md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-2xl",
      item: "text-left text-slate-300 hover:text-white py-2"
    }
  },
  hero: {
    section: "relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden",
    gradientPurple: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none",
    gradientBlue: "absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none",
    content: "max-w-7xl mx-auto px-6 relative z-10 text-center",
    badge: {
      wrapper: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-pink-400 text-sm mb-8 animate-bounce",
      dotWrapper: "relative flex h-2 w-2",
      ping: "animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75",
      dot: "relative inline-flex rounded-full h-2 w-2 bg-pink-500"
    },
    heading: {
      main: "text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight",
      gradient: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
    },
    subtext: "text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed",
    btnGroup: "flex flex-col sm:flex-row items-center justify-center gap-4",
    btn: {
      primary: "px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
      secondary: "px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-lg font-bold hover:bg-slate-700 transition-all flex items-center gap-2"
    }
  },
  features: {
    section: "py-20 bg-slate-900/50 relative",
    grid: "grid md:grid-cols-3 gap-8 -mt-32 relative z-20",
    card: "bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-xl group",
    iconWrapper: "w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-700",
    badgeWrapper: "flex gap-2 text-xs font-mono text-slate-500 uppercase",
    badge: "bg-slate-900 px-2 py-1 rounded border border-slate-700",
    btn: "mt-6 w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded transition-colors text-sm"
  },
  split: {
    circleGreen: "relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(16,185,129,0.3)]",
    iconBoxGreen: "w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 text-green-400",
    iconBoxOrange: "w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 text-orange-400",
    listItem: "flex items-center gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800",
    listIcon: "w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0",
    btnOrange: "text-orange-400 font-bold hover:text-orange-300 flex items-center gap-2 group"
  },
  terminal: {
    section: "py-24 bg-slate-900 border-y border-slate-800",
    window: "bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700",
    header: "h-8 bg-slate-950 flex items-center px-4 gap-2",
    body: "p-8 bg-slate-900/50 font-mono text-sm",
    footer: "p-6 bg-slate-800 border-t border-slate-700"
  },
  gradientSection: {
    wrapper: "py-24 relative overflow-hidden",
    bgOverlay: "absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 opacity-90",
    shape1: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl",
    shape2: "absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl",
    iconBox: "w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur shrink-0",
    featureCard: "bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
  },
  stats: {
    section: "py-24 bg-slate-950",
    iconBox: "w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 rotate-3 hover:rotate-0 transition-all",
    listItem: "flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-yellow-500/50 transition-colors"
  },
  darkCards: {
    section: "py-32 bg-slate-900 relative",
    bgPattern: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5",
    card: "bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-pink-500/50 transition-all group",
    iconWrapper: "w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform"
  },
  review: {
    card: "bg-slate-800 p-10 rounded-2xl border border-slate-700 relative shadow-2xl",
    quoteMark: "text-6xl text-slate-600 absolute top-4 left-6 font-serif",
    text: "text-2xl text-slate-300 font-light italic leading-relaxed relative z-10",
    btn: "px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-1"
  },
  footer: {
    section: "bg-slate-950 border-t border-slate-900 py-16",
    heading: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2",
    iconBtn: "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all",
    link: "text-slate-300 cursor-pointer hover:text-pink-500"
  }
};