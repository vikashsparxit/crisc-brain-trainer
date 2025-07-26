import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface SettingsProps {
  onApiKeySet: (key: string) => void;
  userName?: string;
  onNameChange?: (name: string) => void;
}

const Settings = ({ onApiKeySet, userName, onNameChange }: SettingsProps) => {
  const [apiKey, setApiKey] = useState('');
  const [name, setName] = useState(userName || '');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved API key on component mount
    const savedKey = localStorage.getItem('deepseek_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  useEffect(() => {
    // Update name when userName prop changes
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
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
      description: "API key has been saved successfully",
      className: "bg-green-500 text-white",
    });
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid name",
        variant: "destructive",
      });
      return;
    }
    
    if (onNameChange) {
      onNameChange(name.trim());
      toast({
        title: "Success",
        description: "Name has been updated successfully",
        className: "bg-green-500 text-white",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleApiKeySubmit} className="space-y-4">
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

      <div className="border-t pt-6">
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Name
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;