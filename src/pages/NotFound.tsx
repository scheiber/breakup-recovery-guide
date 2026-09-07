import { Link } from "react-router-dom";
import { HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Seo title="Page Not Found" />
      <div className="text-center space-y-6 animate-fade-in max-w-md px-4">
        <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="heading-xl">404</h1>
        <p className="text-xl text-muted-foreground">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="mt-4">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
