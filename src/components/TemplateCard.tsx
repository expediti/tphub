import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Download, Eye, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  id?: string;
  title: string;
  editor: string;
  image: string;
  videoPreview?: string; // Add video preview URL
  downloads?: number;
  likes?: number;
  duration?: string;
  tags?: string[];
}

const TemplateCard = ({ 
  id = '1', 
  title, 
  editor, 
  image, 
  videoPreview,
  downloads = 0, 
  likes = 0,
  duration = "0:15",
  tags = []
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoPreview) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowControls(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative aspect-video overflow-hidden bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Static Image */}
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered && videoPreview ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video Preview */}
        {videoPreview && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            src={videoPreview}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Play/Pause Overlay */}
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
              <Play className="h-6 w-6 text-black fill-black" />
            </div>
          </div>
        )}

        {/* Video Controls */}
        {isHovered && videoPreview && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors p-1"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
              </button>
              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors p-1"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/70 text-white border-0 text-xs">
              {duration}
            </Badge>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/90 text-white border-0 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription>{editor}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">{editor}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {likes}
            </span>
          </div>
        </div>
        
        <Button className="w-full" asChild>
          <Link to={`/template/${id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Template
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
