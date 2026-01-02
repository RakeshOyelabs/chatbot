'use client';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const SocialMediaCard = ({ platform, count, label, color }) => {
  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-6 h-6 text-white" />;
      case 'twitter':
        return <Twitter className="w-6 h-6 text-white" />;
      case 'instagram':
        return <Instagram className="w-6 h-6 text-white" />;
      case 'youtube':
        return <Youtube className="w-6 h-6 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (platform) {
      case 'facebook':
        return 'bg-blue-600';
      case 'twitter':
        return 'bg-sky-500';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-600 to-pink-500';
      case 'youtube':
        return 'bg-red-600';
      case 'linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${getBackgroundColor()} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
        {getIcon()}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {count.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
};

export default SocialMediaCard;