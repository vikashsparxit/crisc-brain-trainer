import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface SettingsProps {
  onApiKeySet: (key: string) => void;
}

const Settings = ({ onApiKeySet }: SettingsProps) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid DeepSeek API key",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('deepseek_api_key', apiKey);
    onApiKeySet(apiKey);
    toast({
      title: "Success",
      description: "API key has been saved for this session",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
          DeepSeek API Key
        </label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your DeepSeek API key"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Save API Key
      </Button>
    </form>
  );
};

export default Settings;