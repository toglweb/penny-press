import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PublicationLogo from "@/components/PublicationLogo";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const {
    id,
    title,
    excerpt,
    imageUrl,
    category,
    price,
    author,
    publishedDate,
    readTime,
    publication
  } = article;
  
  // If no publication is specified, assign a random one
  const articlePublication = publication || [
    'The New York Times',
    'The Washington Post',
    'Wall Street Journal',
    'CNN',
    'BBC News',
    'Reuters',
    'Bloomberg News'
  ][Math.floor(Math.random() * 7)];

  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/article/${id}`}>
      <div className="article-card rounded-lg overflow-hidden border border-[#E6E6E6] h-full cursor-pointer">
        <img 
          src={imageUrl} 
          alt={`${title} featured image`} 
          className={`w-full ${featured ? 'h-64' : 'h-48'} object-cover`}
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="bg-[#1A8917] bg-opacity-10 text-[#1A8917] text-sm font-bold py-1 px-3 rounded-full">
                ${price.toFixed(2)}
              </Badge>
              <span className="text-sm text-[#757575]">{category}</span>
            </div>
            <div className="w-16 sm:w-20 flex-shrink-0 mb-2">
              <PublicationLogo name={articlePublication} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 font-serif">{title}</h3>
          <p className="text-[#757575] mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={author.avatarUrl} alt={`${author.name} avatar`} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{author.name}</p>
                <p className="text-xs text-[#757575]">{formattedDate} · {readTime} min read</p>
              </div>
            </div>
            <div className="text-xs text-[#757575] italic">via {articlePublication}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
