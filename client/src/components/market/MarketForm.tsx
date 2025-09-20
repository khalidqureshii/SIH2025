import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormProps {
  onSubmit: (data: { state: string; district: string; commodity: string }) => void;
}

const MarketForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [commodity, setCommodity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, district, commodity });
  };

  return (
    <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
          <Input placeholder="Enter District" value={district} onChange={(e) => setDistrict(e.target.value)} />
          <Input placeholder="Enter Commodity" value={commodity} onChange={(e) => setCommodity(e.target.value)} />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            Search Markets
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
