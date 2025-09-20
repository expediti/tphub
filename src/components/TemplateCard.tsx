import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  id?: string;
  title: string;
  editor: string;
  image: string;
  downloads?: number;
  likes?: number;
}

const TemplateCard = ({ id = '1', title, editor, image, downloads = 0, likes = 0 }: TemplateCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
