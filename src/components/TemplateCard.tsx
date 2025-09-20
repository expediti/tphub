import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Heart, Clock } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  title: string;
  editor: string;
  image: string;
  videoPreview?: string;
  downloads: number;
  likes: number;
  duration: string;
  tags?: string[];
}

const TemplateCard = ({ 
  id, title, editor, image, videoPreview, downloads, likes, duration, tags = []
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/template/${id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div 
          className="relative aspect-video overflow-hidden rounded-t-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && videoPreview ? (
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={videoPreview} type="video/mp4" />
            </video>
          ) : (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          )}
          
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">{editor}</span>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </span>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Download className="w-3 h-3 mr-1" />
                {downloads.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {likes.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TemplateCard;
