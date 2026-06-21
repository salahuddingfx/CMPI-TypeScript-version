import { PageTransition } from "@/components/common/PageTransition";
import { SEO } from "@/components/common/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Compass } from "lucide-react";
import { useRef } from "react";

export function VirtualTour() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <PageTransition>
      <SEO title="Virtual Campus Tour" description="Take a 360 virtual tour of Cox's Bazar Model Polytechnic Institute." />
      
      {/* Parallax Hero */}
      <section ref={containerRef} className="relative h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dee4d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Campus" 
            className="w-full h-full object-cover opacity-40 scale-110"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Compass className="w-16 h-16 mx-auto mb-6 text-secondary animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">Explore CMPI</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              Take an interactive journey through our state-of-the-art facilities, modern laboratories, and vibrant campus grounds.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ y: y2 }} className="absolute -bottom-32 left-0 w-full h-64 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* Interactive Map Area (Simulated) */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12">Campus Map 360°</h2>
          
          <div className="w-full max-w-5xl mx-auto h-[600px] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative group border border-slate-200 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200" 
              alt="Interactive Campus Map" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
               <div className="glass px-8 py-4 rounded-full text-white font-bold flex items-center gap-3">
                 <MapPin className="w-6 h-6 text-secondary" /> Click to Enter Virtual Tour
               </div>
            </div>
            
            {/* Hotspots */}
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">1</div>
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce delay-100">2</div>
            <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce delay-200">3</div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
