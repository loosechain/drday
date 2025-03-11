"use client"; // Mark this as a Client Component
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Modern animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.24, 0.25, 0.05, 1] }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2, ease: [0.24, 0.25, 0.05, 1] }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1, ease: [0.24, 0.25, 0.05, 1] }
  }
};

// Helper function to fetch dry day data
async function getDryDayData() {
  const response = await fetch("/data/dryDays.json");
  if (!response.ok) {
    throw new Error("Failed to fetch dry day data");
  }
  return response.json();
}

export default function Home() {
  const [isDryDay, setIsDryDay] = useState(false);
  const [reason, setReason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const dryDayData = await getDryDayData();
        const today = new Date().toISOString().split("T")[0];
        const dryDay = dryDayData.dry_days.find((day) => day.date === today);
        setIsDryDay(!!dryDay);
        setReason(dryDay ? dryDay.reason : null);
      } catch (error) {
        console.error("Error fetching dry day data:", error);
      } finally {
        setIsLoading(false);
        // Reduced delay for better UX
        setTimeout(() => setShowResult(true), 800);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center flex-1">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-8 px-4 md:px-6 gap-6 md:gap-8">
      {/* Main Card */}
      <motion.div
        initial="initial"
        animate={showResult ? "animate" : "initial"}
        variants={cardVariants}
        className="w-full max-w-xl"
      >
        <Card className="w-full shadow-lg text-center p-4 md:p-6 rounded-2xl bg-black text-white border border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {showResult ? (isDryDay ? "Dry Day 🚫" : "Bar Open 🍻") : "Checking..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showResult && (
              <p className="text-base md:text-lg mt-2">
                {isDryDay ? `No alcohol sales today. Reason: ${reason}` : "Enjoy responsibly!"}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Feature Cards */}
      <motion.div 
        className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.24, 0.25, 0.05, 1] }}
      >
        {/* Check Prices */}
        <Card className="bg-black text-white border border-gray-700 rounded-xl p-3 md:p-4 flex flex-col">
          <CardHeader className="space-y-1 p-0 pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold">Check Prices</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 justify-between">
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Find all liquor prices in Kerala</p>
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                className="w-full bg-white text-black border-white 
                  hover:border-white hover:bg-transparent hover:text-white
                  transition-all duration-300 ease-out
                  shadow-[0_0_0_0_rgba(255,255,255,0.1)]
                  hover:shadow-[0_0_20px_0_rgba(255,255,255,0.1)]
                  text-sm md:text-[15px] font-medium tracking-wide py-3 md:py-5
                  hover:font-semibold"
                onClick={() => router.push("/rates")}
              >
                View Prices
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Events Card */}
        <Card className="bg-black text-white border border-gray-700 rounded-xl p-3 md:p-4 flex flex-col">
          <CardHeader className="space-y-1 p-0 pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold">Events 🎉</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 justify-between">
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Book your spot for upcoming events</p>
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                className="w-full bg-white text-black border-white 
                  hover:border-white hover:bg-transparent hover:text-white
                  transition-all duration-300 ease-out
                  shadow-[0_0_0_0_rgba(255,255,255,0.1)]
                  hover:shadow-[0_0_20px_0_rgba(255,255,255,0.1)]
                  text-sm md:text-[15px] font-medium tracking-wide py-3 md:py-5
                  hover:font-semibold"
                onClick={() => router.push("/events")}
              >
                Book Now
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-black text-white border border-gray-700 rounded-xl p-3 md:p-4 flex flex-col">
          <CardHeader className="space-y-1 p-0 pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold">Social Media</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 justify-between">
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Find and follow us on Telegram & Instagram</p>
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                className="w-full bg-white text-black border-white 
                  hover:border-white hover:bg-transparent hover:text-white
                  transition-all duration-300 ease-out
                  shadow-[0_0_0_0_rgba(255,255,255,0.1)]
                  hover:shadow-[0_0_20px_0_rgba(255,255,255,0.1)]
                  text-sm md:text-[15px] font-medium tracking-wide py-3 md:py-5
                  hover:font-semibold"
                onClick={() => router.push("/social")}
              >
                Follow Us
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Donate */}
        <Card className="bg-black text-white border border-gray-700 rounded-xl p-3 md:p-4 flex flex-col">
          <CardHeader className="space-y-1 p-0 pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold">Donate 💰</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 justify-between">
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Support DryDay by donating ₹1</p>
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                className="w-full bg-white text-black border-white 
                  hover:border-white hover:bg-transparent hover:text-white
                  transition-all duration-300 ease-out
                  shadow-[0_0_0_0_rgba(255,255,255,0.1)]
                  hover:shadow-[0_0_20px_0_rgba(255,255,255,0.1)]
                  text-sm md:text-[15px] font-medium tracking-wide py-3 md:py-5
                  hover:font-semibold"
                onClick={() => router.push("/donate")}
              >
                Donate ₹1
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
