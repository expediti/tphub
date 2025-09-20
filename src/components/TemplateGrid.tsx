import TemplateCard from "./TemplateCard";

const templates = [
  {
    id: '1',
    title: "Viral Phonk Intro",
    editor: "CapCut",
    image: "/api/placeholder/400/225",
    downloads: 15420,
    likes: 1240
  },
  {
    id: '2', 
    title: "Instagram Story Pack",
    editor: "After Effects",
    image: "/api/placeholder/400/225",
    downloads: 8330,
    likes: 892
  },
  {
    id: '3',
    title: "YouTube Intro Template",
    editor: "Premiere Pro",
    image: "/api/placeholder/400/225",
    downloads: 6540,
    likes: 673
  },
  {
    id: '4',
    title: "TikTok Transition Pack",
    editor: "CapCut",
    image: "/api/placeholder/400/225",
    downloads: 12100,
    likes: 1156
  },
  {
    id: '5',
    title: "Logo Animation",
    editor: "After Effects", 
    image: "/api/placeholder/400/225",
    downloads: 4820,
    likes: 445
  },
  {
    id: '6',
    title: "Podcast Intro",
    editor: "DaVinci Resolve",
    image: "/api/placeholder/400/225",
    downloads: 3210,
    likes: 298
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
          downloads={template.downloads}
          likes={template.likes}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
