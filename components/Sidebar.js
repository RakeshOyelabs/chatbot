'use client';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Layout, 
  FileText, 
  Mail, 
  MessageCircle, 
  ShoppingCart, 
  Users2, 
  FolderOpen, 
  Calendar, 
  Users, 
  Phone, 
  StickyNote, 
  CheckSquare, 
  Trello, 
  ArrowUpDown, 
  ListTodo,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar = () => {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), key: 'dashboard', active: true },
    { icon: Layout, label: t('layouts'), key: 'layouts', expandable: true },
    { icon: FileText, label: t('changelog'), key: 'changelog', badge: '3.0.1' },
    { icon: Mail, label: t('email'), key: 'email', expandable: true },
    { icon: MessageCircle, label: t('chat'), key: 'chat' },
    { icon: ShoppingCart, label: t('ecommerce'), key: 'ecommerce', expandable: true },
    { icon: Users2, label: t('socialApp'), key: 'socialApp', expandable: true },
    { icon: FolderOpen, label: t('project'), key: 'project', expandable: true },
    { icon: Calendar, label: t('calendar'), key: 'calendar' },
    { icon: Users, label: t('users'), key: 'users', expandable: true },
    { icon: Phone, label: t('contact'), key: 'contact', expandable: true },
    { icon: StickyNote, label: t('note'), key: 'note' },
    { icon: CheckSquare, label: t('toDo'), key: 'toDo' },
    { icon: Trello, label: t('kanbanBoard'), key: 'kanbanBoard' },
    { icon: ArrowUpDown, label: t('importExport'), key: 'importExport' },
    { icon: ListTodo, label: t('task'), key: 'task', badge: 'NEW' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">StrikingDash</span>
        </div>
      </div>
      
      <div className="px-4 pb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          MAIN MENU
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems[item.key];
            
            return (
              <div key={item.key}>
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    item.active 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => item.expandable && toggleExpanded(item.key)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.badge === 'NEW' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.expandable && (
                    <div className="text-gray-400 flex-shrink-0">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className="px-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          CRUD
        </div>
      </div>
    </div>
  );
};

export default Sidebar;