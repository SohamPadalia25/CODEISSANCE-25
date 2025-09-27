// src/pages/Community.jsx
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share,
  Bookmark,
  MoreHorizontal,
  Send,
  Image,
  Smile,
  Heart,
  TrendingUp,
  Calendar,
  Filter
} from "lucide-react";

// Mock users with avatars and colors
const mockUsers = [
  { id: 1, name: "Riya Sharma", avatar: "RS", color: "bg-red-100 text-red-600" },
  { id: 2, name: "Rahul Mehta", avatar: "RM", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Priya Patel", avatar: "PP", color: "bg-green-100 text-green-600" },
  { id: 4, name: "Amit Kumar", avatar: "AK", color: "bg-purple-100 text-purple-600" },
  { id: 5, name: "You", avatar: "ME", color: "bg-orange-100 text-orange-600" }
];

const mockPosts = [
  {
    id: 1,
    userId: 1,
    time: "2h ago",
    content: "I just donated blood today! Feeling great to contribute 💉❤️",
    likes: 12,
    comments: [
      { id: 1, userId: 2, text: "Amazing! Proud of you 👏", time: "1h ago" },
      { id: 2, userId: 3, text: "You inspire me to donate too!", time: "45m ago" },
    ],
    shares: 3,
    saved: true,
    type: "experience"
  },
  {
    id: 2,
    userId: 2,
    time: "5h ago",
    content: "Looking for O+ donors in Pune. Please reach out if available 🙏",
    likes: 8,
    comments: [{ id: 1, userId: 4, text: "Shared in my group!", time: "3h ago" }],
    shares: 5,
    saved: false,
    type: "request"
  },
  {
    id: 3,
    userId: 3,
    time: "1d ago",
    content: "Just completed my 10th blood donation! 🎉 Remember folks, regular donors save more lives!",
    likes: 24,
    comments: [
      { id: 1, userId: 1, text: "Congratulations! That's incredible!", time: "20h ago" },
      { id: 2, userId: 2, text: "You're a hero! 👏", time: "18h ago" },
    ],
    shares: 8,
    saved: true,
    type: "milestone"
  }
];

const Community = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [commentInputs, setCommentInputs] = useState({});
  const [savedPosts, setSavedPosts] = useState([1, 3]);
  const [filters, setFilters] = useState({
    postType: "all",
    sortBy: "recent"
  });

  const getUserById = (userId) => mockUsers.find(user => user.id === userId);
  const getCurrentUser = () => mockUsers.find(user => user.name === "You");

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    
    const newEntry = {
      id: posts.length + 1,
      userId: getCurrentUser().id,
      time: "Just now",
      content: newPost,
      likes: 0,
      comments: [],
      shares: 0,
      saved: false,
      type: "post"
    };
    
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleSavePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, saved: !post.saved } : post
    ));
    
    setSavedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          userId: getCurrentUser().id,
          text: commentText,
          time: "Just now"
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
    
    // Simulate share functionality
    alert("Post shared successfully!");
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === "all") return true;
    if (activeTab === "saved") return savedPosts.includes(post.id);
    if (activeTab === "requests") return post.type === "request";
    if (activeTab === "experiences") return post.type === "experience";
    if (activeTab === "milestones") return post.type === "milestone";
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === "popular") {
      return (b.likes + b.comments.length) - (a.likes + a.comments.length);
    }
    return new Date(b.time) - new Date(a.time);
  });

  const getPostTypeBadge = (type) => {
    const types = {
      experience: { label: "Experience", variant: "default", color: "bg-blue-100 text-blue-800" },
      request: { label: "Help Needed", variant: "destructive", color: "bg-red-100 text-red-800" },
      milestone: { label: "Milestone", variant: "secondary", color: "bg-green-100 text-green-800" },
      post: { label: "Discussion", variant: "outline", color: "bg-gray-100 text-gray-800" }
    };
    
    const typeConfig = types[type] || types.post;
    return (
      <Badge variant={typeConfig.variant} className={`text-xs ${typeConfig.color}`}>
        {typeConfig.label}
      </Badge>
    );
  };

  const communityStats = {
    totalPosts: posts.length,
    activeUsers: 42,
    todayPosts: posts.filter(post => post.time.includes("h ago") || post.time === "Just now").length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0)
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Community Hub
              </h1>
              <p className="text-muted-foreground">
                Connect with donors, share experiences, and support each other
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{communityStats.totalPosts}</p>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{communityStats.activeUsers}</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{communityStats.todayPosts}</p>
                    <p className="text-sm text-muted-foreground">Today's Posts</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{communityStats.totalLikes}</p>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters & Sort
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <select 
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                        className="w-full p-2 border rounded-md text-sm"
                      >
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Post Type</label>
                      <select 
                        value={filters.postType}
                        onChange={(e) => setFilters({...filters, postType: e.target.value})}
                        className="w-full p-2 border rounded-md text-sm"
                      >
                        <option value="all">All Types</option>
                        <option value="experience">Experiences</option>
                        <option value="request">Help Needed</option>
                        <option value="milestone">Milestones</option>
                      </select>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({ postType: "all", sortBy: "recent" })}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>

                {/* Community Guidelines */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm">Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs text-muted-foreground">
                    <p>• Be respectful and supportive</p>
                    <p>• Share genuine experiences</p>
                    <p>• Verify information before sharing</p>
                    <p>• Maintain privacy and safety</p>
                    <p>• Report inappropriate content</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="experiences">Experiences</TabsTrigger>
                    <TabsTrigger value="requests">Help Needed</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-6">
                    {/* Create Post Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-lg">Create Post</span>
                        </CardTitle>
                        <CardDescription>
                          Share your donation experience or request help from the community
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          placeholder="What's on your mind? Share your blood donation story, ask for help, or inspire others..."
                          className="min-h-[100px] resize-none"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Image className="h-4 w-4" />
                              Image
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Smile className="h-4 w-4" />
                              Emoji
                            </Button>
                          </div>
                          <Button 
                            onClick={handleAddPost}
                            disabled={!newPost.trim()}
                            className="bg-primary hover:bg-primary-hover text-primary-foreground"
                          >
                            Post
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Posts Feed */}
                    <div className="space-y-6">
                      {filteredPosts.map((post) => {
                        const user = getUserById(post.userId);
                        return (
                          <Card key={post.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className={`${user.color} h-10 w-10`}>
                                    <AvatarFallback className="text-sm font-semibold">
                                      {user.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-semibold">{user.name}</p>
                                      {getPostTypeBadge(post.type)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{post.time}</p>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                    <DropdownMenuItem>Hide</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                              <p className="text-foreground leading-relaxed">{post.content}</p>
                              
                              {/* Post Actions */}
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2 hover:text-red-600"
                                    onClick={() => handleLike(post.id)}
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                    {post.likes}
                                  </Button>
                                  
                                  <Button variant="ghost" size="sm" className="gap-2">
                                    <MessageCircle className="h-4 w-4" />
                                    {post.comments.length}
                                  </Button>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2"
                                    onClick={() => handleShare(post.id)}
                                  >
                                    <Share className="h-4 w-4" />
                                    {post.shares}
                                  </Button>
                                </div>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`gap-2 ${post.saved ? 'text-yellow-600' : ''}`}
                                  onClick={() => handleSavePost(post.id)}
                                >
                                  <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-current' : ''}`} />
                                  Save
                                </Button>
                              </div>

                              <Separator />

                              {/* Comments Section */}
                              <div className="space-y-3">
                                {post.comments.map((comment) => {
                                  const commentUser = getUserById(comment.userId);
                                  return (
                                    <div key={comment.id} className="flex gap-3">
                                      <Avatar className={`${commentUser.color} h-6 w-6`}>
                                        <AvatarFallback className="text-xs">
                                          {commentUser.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="bg-muted/50 rounded-lg p-3">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium">{commentUser.name}</span>
                                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                                          </div>
                                          <p className="text-sm">{comment.text}</p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                                
                                {/* Add Comment */}
                                <div className="flex gap-3">
                                  <Avatar className={`${getCurrentUser().color} h-6 w-6`}>
                                    <AvatarFallback className="text-xs">
                                      {getCurrentUser().avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 flex gap-2">
                                    <Input
                                      placeholder="Write a comment..."
                                      value={commentInputs[post.id] || ""}
                                      onChange={(e) => setCommentInputs(prev => ({
                                        ...prev,
                                        [post.id]: e.target.value
                                      }))}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          handleAddComment(post.id, commentInputs[post.id]);
                                        }
                                      }}
                                    />
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAddComment(post.id, commentInputs[post.id])}
                                      disabled={!commentInputs[post.id]?.trim()}
                                    >
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      
                      {filteredPosts.length === 0 && (
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                            <p className="text-muted-foreground">
                              {activeTab === "saved" 
                                ? "You haven't saved any posts yet." 
                                : "Be the first to start a discussion!"}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Community;