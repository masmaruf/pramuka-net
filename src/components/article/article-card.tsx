import Link from "next/link";
import Image from "next/image";
import { Eye, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Article } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        {article.thumbnailUrl && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized
            />
          </div>
        )}
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {article.category.name}
            </Badge>
            {article.isEditorPick && (
              <Badge className="gap-1 bg-accent text-accent-foreground text-xs">
                <Star className="h-3 w-3" />
                Editor Pick
              </Badge>
            )}
          </div>

          <h3 className="mb-2 text-lg font-semibold leading-tight group-hover:text-primary">
            {article.title}
          </h3>

          <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">
                  {getInitials(article.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.views.toLocaleString("id-ID")}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
