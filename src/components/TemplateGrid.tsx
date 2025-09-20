import TemplateCard from "./TemplateCard";

const templates = [
  {
    id: '1',
    title: "Viral Phonk Intro",
    editor: "CapCut",
    image: "/api/placeholder/400/225",
    videoPreview: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video
    downloads: 15420,
    likes: 1240,
    duration: "0:15",
    tags: ["phonk", "viral"]
  },
  {
    id: '2', 
    title: "Instagram Story Pack",
    editor: "After Effects",
    image: "/api/placeholder/400/225",
    videoPreview: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    downloads: 8330,
    likes: 892,
    duration: "0:12",
    tags: ["story", "instagram"]
  },
  {
    id: '3',
    title: "YouTube Intro Template",
    editor: "Premiere Pro",
    image: "/api/placeholder/400/225",
    videoPreview: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    downloads: 6540,
    likes: 673,
    duration: "0:08",
    tags: ["youtube", "intro"]
  },
  {
    id: '4',
    title: "TikTok Transition Pack",
    editor: "CapCut",
    image: "/api/placeholder/400/225",
    videoPreview: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    downloads: 12100,
    likes: 1156,
    duration: "0:10",
    tags: ["tiktok", "transition"]
  },
  {
    id: '5',
    title: "Logo Animation",
    editor: "After Effects", 
    image: "/api/placeholder/400/225",
    downloads: 4820,
    likes: 445,
    duration: "0:06"
  },
  {
    id: '6',
    title: "Podcast Intro",
    editor: "DaVinci Resolve",
    image: "/api/placeholder/400/225",
    downloads: 3210,
    likes: 298,
    duration: "0:20"
  }
];

const TemplateGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          editor={template.editor}
          image={template.image}
          videoPreview={template.videoPreview}
          downloads={template.downloads}
          likes={template.likes}
          duration={template.duration}
          tags={template.tags}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
