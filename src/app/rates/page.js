"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function RatesPage() {
  const [liquorData, setLiquorData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data/FIML_List.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setLiquorData(data);
      } catch (error) {
        console.error("Error fetching liquor data:", error);
      }
    }
    fetchData();
  }, []);

  const filteredData = liquorData
    .filter((item) =>
      (filterType === "All" || item.type === filterType) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
      return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Liquor Rates</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-4 items-center justify-center">
        <Input
          className="w-full md:w-auto"
          placeholder="Search liquor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Whisky">Whisky</SelectItem>
            <SelectItem value="Rum">Rum</SelectItem>
            <SelectItem value="Vodka">Vodka</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="price">Sort by Price</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setOrder}>
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((item, index) => (
          <div
            key={item.name}
            className="group relative overflow-hidden rounded-xl bg-white p-6 transition-all duration-300 
            hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1
            border border-gray-100/50 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)]
            backdrop-blur-sm
            ring-1 ring-black/[0.15] dark:ring-white/[0.15]
            hover:ring-2 hover:ring-black/[0.25] dark:hover:ring-white/[0.25]
            before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] before:opacity-0 before:transition-opacity
            hover:before:opacity-100"
            style={{
              animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50 mb-4 
            shadow-inner border border-gray-100/80">
              <img 
                src="/bottleImage.avif" 
                alt={item.name} 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-lg tracking-tight text-gray-900 line-clamp-2 min-h-[3.5rem]">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100/80">
                <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
                <p className="text-sm text-gray-500">{item.quantity}ml</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </Button>
        <span className="px-4 py-2 border rounded">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <Button disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}