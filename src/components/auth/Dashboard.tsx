import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LogOut, User, Home, Plus, CheckCircle, Star, Trash2, Calendar } from 'lucide-react';
import { Container } from '../../lib/dev-container';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  emoji: string;
  dueDate?: string;
  createdAt: string;
  stars: number;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const Dashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards' | 'profile'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories] = useState<Category[]>([
    { id: '1', name: 'School', emoji: '📚', color: 'bg-blue-500' },
    { id: '2', name: 'Chores', emoji: '🧹', color: 'bg-green-500' },
    { id: '3', name: 'Fun', emoji: '🎮', color: 'bg-pink-500' },
    { id: '4', name: 'Health', emoji: '🏃', color: 'bg-orange-500' },
  ]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '1',
    emoji: '📝',
    dueDate: ''
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    // Load sample tasks
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Brush my teeth',
        description: 'Morning and evening',
        completed: true,
        category: '4',
        emoji: '🦷',
        createdAt: new Date().toISOString(),
        stars: 10
      },
      {
        id: '2',
        title: 'Do math homework',
        description: 'Pages 15-17',
        completed: false,
        category: '1',
        emoji: '🔢',
        dueDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        stars: 20
      },
      {
        id: '3',
        title: 'Clean my room',
        description: 'Put toys away and make bed',
        completed: false,
        category: '2',
        emoji: '🛏️',
        createdAt: new Date().toISOString(),
        stars: 15
      }
    ];
    setTasks(sampleTasks);
    
    // Calculate stats
    const completed = sampleTasks.filter(task => task.completed);
    setTotalStars(completed.reduce((sum, task) => sum + task.stars, 0));
    setCompletedToday(completed.length);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      category: newTask.category,
      emoji: newTask.emoji,
      dueDate: newTask.dueDate || undefined,
      createdAt: new Date().toISOString(),
      stars: Math.floor(Math.random() * 20) + 10
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', category: '1', emoji: '📝', dueDate: '' });
    setShowAddTask(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          setTotalStars(prev => prev + task.stars);
          setCompletedToday(prev => prev + 1);
        } else {
          setTotalStars(prev => prev - task.stars);
          setCompletedToday(prev => prev - 1);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task?.completed) {
      setTotalStars(prev => prev - task.stars);
      setCompletedToday(prev => prev - 1);
    }
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  if (isPending) {
    return (
      <Container componentId="dashboard-loading">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🌟</div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mx-auto mb-4"></div>
            <p className="text-white font-bold text-lg">Loading your awesome tasks...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
          <Card className="w-full max-w-md bg-white/20 backdrop-blur-sm border border-white/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-xl font-bold text-white mb-2">Oops! You need to sign in!</h2>
                <p className="text-white/80 mb-4">
                  Please log in to see your awesome tasks! 🌟
                </p>
                <Button onClick={() => navigate('/login')} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold">
                  🔑 Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const user = session.user;

  return (
    <Container componentId="dashboard-page">
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
        {/* Header */}
        <Container componentId="dashboard-header">
          <div className="bg-white/20 backdrop-blur-sm border-b border-white/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📝</div>
                  <h1 className="text-2xl font-bold text-white drop-shadow">
                    Hi {user.name?.split(' ')[0]}! ✨
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/30">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white font-bold">{totalStars}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white hover:bg-white/20"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white hover:bg-white/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Navigation Tabs */}
        <Container componentId="dashboard-page">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveTab('tasks')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                📝 My Tasks
              </Button>
              <Button
                onClick={() => setActiveTab('rewards')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'rewards'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                🏆 Rewards
              </Button>
              <Button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                👤 Profile
              </Button>
            </div>
          </div>
        </Container>

        <Container componentId="dashboard-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">⭐</div>
                        <div className="text-2xl font-bold text-white">{totalStars}</div>
                        <p className="text-white/80">Total Stars</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✅</div>
                        <div className="text-2xl font-bold text-white">{completedToday}</div>
                        <p className="text-white/80">Completed Today</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📋</div>
                        <div className="text-2xl font-bold text-white">{tasks.length}</div>
                        <p className="text-white/80">Total Tasks</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Add Task Button */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">My Awesome Tasks! 🎯</h2>
                  <Button
                    onClick={() => setShowAddTask(!showAddTask)}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Task
                  </Button>
                </div>

                {/* Add Task Form */}
                {showAddTask && (
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Plus className="h-5 w-5 mr-2" />
                        Create a New Task! 🌟
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white font-medium mb-2 block">Task Name</label>
                          <Input
                            placeholder="What do you need to do? 🤔"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder-white/60"
                          />
                        </div>
                        <div>
                          <label className="text-white font-medium mb-2 block">Emoji</label>
                          <Input
                            placeholder="📝"
                            value={newTask.emoji}
                            onChange={(e) => setNewTask({ ...newTask, emoji: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder-white/60"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Description (Optional)</label>
                        <Textarea
                          placeholder="Tell me more about this task! 💭"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          className="bg-white/20 border-white/30 text-white placeholder-white/60"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white font-medium mb-2 block">Category</label>
                          <select
                            value={newTask.category}
                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                            className="w-full p-2 rounded-lg bg-white/20 border border-white/30 text-white"
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id} className="text-black">
                                {cat.emoji} {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-white font-medium mb-2 block">Due Date (Optional)</label>
                          <Input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                            className="bg-white/20 border-white/30 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={addTask}
                          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold"
                        >
                          ✨ Create Task
                        </Button>
                        <Button
                          onClick={() => setShowAddTask(false)}
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tasks List */}
                <div className="space-y-4">
                  {tasks.map(task => {
                    const category = getCategoryById(task.category);
                    return (
                      <Card
                        key={task.id}
                        className={`bg-white/20 backdrop-blur-sm border border-white/30 transition-all hover:shadow-lg ${
                          task.completed ? 'opacity-75' : ''
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <Button
                                onClick={() => toggleTask(task.id)}
                                className={`w-8 h-8 rounded-full p-0 ${
                                  task.completed
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-white/20 hover:bg-white/30'
                                }`}
                              >
                                {task.completed ? (
                                  <CheckCircle className="h-4 w-4 text-white" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-white rounded-full" />
                                )}
                              </Button>
                              <div className="text-3xl">{task.emoji}</div>
                              <div className="flex-1">
                                <h3 className={`text-lg font-bold text-white ${
                                  task.completed ? 'line-through' : ''
                                }`}>
                                  {task.title}
                                </h3>
                                {task.description && (
                                  <p className="text-white/80 text-sm">{task.description}</p>
                                )}
                                <div className="flex items-center space-x-4 mt-2">
                                  {category && (
                                    <Badge className={`${category.color} text-white border-none`}>
                                      {category.emoji} {category.name}
                                    </Badge>
                                  )}
                                  <div className="flex items-center text-yellow-400">
                                    <Star className="h-4 w-4 mr-1" />
                                    <span className="text-white font-medium">{task.stars}</span>
                                  </div>
                                  {task.dueDate && (
                                    <div className="flex items-center text-white/60">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => deleteTask(task.id)}
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {task.completed && (
                            <div className="mt-4 p-3 bg-green-400/20 rounded-lg border border-green-400/30">
                              <div className="text-center text-green-300 font-bold">
                                🎉 Awesome job! You earned {task.stars} stars! ⭐
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                  🏆 Your Amazing Rewards! 🎁
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-6xl mb-4">🌟</div>
                      <h3 className="text-xl font-bold text-white mb-2">Star Collector</h3>
                      <p className="text-white/80 mb-4">Earned 50+ stars</p>
                      <Badge className="bg-yellow-500 text-white">Unlocked!</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-white mb-2">Task Rocket</h3>
                      <p className="text-white/80 mb-4">Complete 10 tasks</p>
                      <Badge className="bg-gray-500 text-white">
                        {tasks.filter(t => t.completed).length}/10
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-xl font-bold text-white mb-2">Perfect Day</h3>
                      <p className="text-white/80 mb-4">Complete all daily tasks</p>
                      <Badge className="bg-gray-500 text-white">Locked</Badge>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      🎁 Reward Store - Coming Soon!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl mb-4">🛍️</div>
                    <p className="text-white/80">
                      Soon you'll be able to spend your stars on awesome rewards like new emoji packs, 
                      themes, and special celebrations! Keep collecting those stars! ⭐
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <Container componentId="dashboard-page">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <User className="h-5 w-5" />
                        My Profile 👤
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20 border-4 border-white/30">
                          <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                          <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                            {getUserInitials(user.name || 'U')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-2xl text-white">{user.name}</h3>
                          <p className="text-white/80">{user.email}</p>
                          <Badge className="bg-green-500 text-white mt-2">
                            ⭐ Task Master
                          </Badge>
                        </div>
                      </div>
                      
                      <Separator className="bg-white/20" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">📧 Email Status</span>
                          <Badge variant={user.emailVerified ? "default" : "secondary"} className="bg-blue-500 text-white">
                            {user.emailVerified ? "✅ Verified" : "⏳ Pending"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">📅 Member Since</span>
                          <span className="text-white/80">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">🏆 Total Stars</span>
                          <span className="text-yellow-400 font-bold text-lg">{totalStars} ⭐</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                      <CardHeader>
                        <CardTitle className="text-white">🎉 My Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white/10 rounded-lg">
                            <div className="text-3xl mb-2">🌟</div>
                            <div className="text-white font-bold">First Star</div>
                            <div className="text-white/60 text-sm">Earned your first star!</div>
                          </div>
                          <div className="text-center p-4 bg-white/10 rounded-lg">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-white font-bold">Task Starter</div>
                            <div className="text-white/60 text-sm">Completed first task!</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
                      <CardHeader>
                        <CardTitle className="text-white">📊 My Stats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white">Tasks Completed</span>
                            <span className="text-green-400 font-bold">{tasks.filter(t => t.completed).length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">Tasks Remaining</span>
                            <span className="text-orange-400 font-bold">{tasks.filter(t => !t.completed).length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">Favorite Category</span>
                            <span className="text-purple-400 font-bold">📚 School</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">Days Active</span>
                            <span className="text-blue-400 font-bold">
                              {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Container>
            )}
          </div>
        </Container>
      </div>
    </Container>
  );
};