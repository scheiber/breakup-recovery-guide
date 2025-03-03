
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleBySlug, articles } from "@/utils/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const article = slug ? getArticleBySlug(slug) : undefined;
  
  useEffect(() => {
    if (!article) {
      navigate("/articles");
    }
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [article, navigate]);
  
  if (!article) {
    return null;
  }
  
  // Find previous and next articles for navigation
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  
  // Generate unique placeholder content based on article ID
  const renderArticleContent = () => {
    switch (article.id) {
      case "intro":
        return (
          <>
            <p>{article.content}</p>
            <p>Welcome to our comprehensive breakup recovery guide. This resource is designed to help you navigate the challenging emotional journey after a relationship ends. Each article addresses a specific aspect of the healing process.</p>
            <h2>How to Use This Guide</h2>
            <p>You can read the articles in sequence or jump to specific topics that resonate with your current situation. Take your time with each concept, and remember that healing is not linear—some days will be better than others.</p>
            <p>The articles combine research-backed information with practical advice that you can apply immediately to your situation. Our goal is to provide both emotional support and actionable strategies.</p>
            <h2>Our Approach</h2>
            <p>We believe in a holistic approach to breakup recovery that addresses emotional, psychological, and practical aspects of healing. The advice here comes from relationship experts, psychologists, and people who have successfully navigated their own breakup journeys.</p>
            <ul>
              <li>Evidence-based methods for processing grief and loss</li>
              <li>Practical strategies for daily coping</li>
              <li>Long-term approaches to rebuilding and growth</li>
              <li>Community support and shared experiences</li>
            </ul>
          </>
        );
        
      case "pain-is-real":
        return (
          <>
            <p>{article.content}</p>
            <p>When you're going through a breakup, the pain you feel is not just emotional—it's physical too. Neuroscience research shows that social rejection activates many of the same brain regions involved in physical pain, which is why a broken heart can literally hurt.</p>
            <h2>The Science Behind Breakup Pain</h2>
            <p>fMRI studies have shown that the same regions of the brain that process physical pain—the anterior cingulate cortex and insula—are active when people experience social rejection. This is why experts now recognize that emotional pain is processed by your brain in a very similar way to physical injuries.</p>
            <p>Understanding that your pain has a neurobiological basis is important because it validates your experience. You're not overreacting or being dramatic—your brain is responding to a genuine threat to your well-being.</p>
            <h2>Common Physical Symptoms</h2>
            <p>Many people experience physical symptoms during a breakup that mirror those of physical illness or injury:</p>
            <ul>
              <li>Chest pain and tightness</li>
              <li>Digestive issues and changes in appetite</li>
              <li>Fatigue and sleep disturbances</li>
              <li>Weakened immune function</li>
            </ul>
          </>
        );

      case "time-to-recover":
        return (
          <>
            <p>{article.content}</p>
            <p>One of the most common questions after a breakup is "How long will it take me to get over this?" While there's no universal timetable for recovery, research and experience suggest some general patterns and factors that influence healing time.</p>
            <h2>Factors That Affect Recovery Time</h2>
            <p>The duration of your recovery period depends on several variables unique to your situation:</p>
            <ul>
              <li>Length of the relationship: Generally, longer relationships take longer to recover from</li>
              <li>Intensity of the connection: Deep emotional investment can extend healing time</li>
              <li>Circumstances of the breakup: Sudden or traumatic endings may require more processing</li>
              <li>Your support system: Strong social support can accelerate healing</li>
              <li>Previous relationship patterns: Recurring relationship issues may extend recovery</li>
            </ul>
            <h2>General Timeframes</h2>
            <p>While everyone is different, research suggests that significant emotional recovery often occurs within the following ranges:</p>
            <p>Recent studies indicate that most people see substantial improvement in their emotional state between 3-6 months post-breakup, with more complete recovery taking about a year for relationships that lasted more than a year.</p>
          </>
        );

      case "no-contact":
        return (
          <>
            <p>{article.content}</p>
            <p>The No Contact rule is one of the most effective strategies for healing after a breakup. It involves completely cutting off communication with your ex-partner for a period of time—typically at least 30 days, but often longer depending on the situation.</p>
            <h2>Why No Contact Works</h2>
            <p>Each time you interact with your ex, you reactivate the attachment system in your brain, effectively reopening emotional wounds that were beginning to heal. Neuroscience shows that contact with an ex can trigger the release of bonding hormones like oxytocin and dopamine, reinforcing your emotional dependency.</p>
            <p>No Contact allows your brain to begin breaking these neurochemical bonds by preventing the regular reinforcement of these pathways. Think of it as letting a physical wound heal without constantly removing the bandage and exposing it to infection.</p>
            <h2>The Benefits of No Contact</h2>
            <ul>
              <li>Accelerates emotional healing by preventing re-traumatization</li>
              <li>Helps reduce obsessive thoughts and rumination</li>
              <li>Provides space to rebuild your identity separate from the relationship</li>
              <li>Prevents the "hope trap" of interpreting casual contact as signs of reconciliation</li>
              <li>Allows you to regain emotional stability and perspective</li>
            </ul>
          </>
        );

      default:
        // For all other articles, generate a different but structured content
        return (
          <>
            <p>{article.content}</p>
            <p>This article about "{article.title}" explores the important aspects of dealing with this particular challenge during breakup recovery. The journey through this specific aspect requires attention and care.</p>
            <h2>Understanding {article.title}</h2>
            <p>When navigating through the complexities of a breakup, the aspects related to {article.title.toLowerCase()} often present unique challenges that require specialized approaches and understanding.</p>
            <p>The emotional and psychological dimensions of this topic interact with your overall recovery journey in ways that might not be immediately obvious but are nonetheless significant.</p>
            <h2>Practical Steps</h2>
            <p>Consider these approaches when dealing with the {article.title.toLowerCase()} aspect of your breakup recovery:</p>
            <ul>
              <li>Acknowledge the specific emotions related to this topic</li>
              <li>Develop coping strategies tailored to this particular challenge</li>
              <li>Recognize patterns from past relationships that might influence your current experience</li>
              <li>Build new skills and perspectives that can help you navigate similar situations in the future</li>
            </ul>
            <h2>Moving Forward</h2>
            <p>As you progress in your healing journey, the insights gained from addressing {article.title.toLowerCase()} will contribute to your overall growth and ability to form healthier relationships in the future.</p>
          </>
        );
    }
  };
  
  return (
    <div className="page-container">
      <div className="mb-8 animate-fade-in">
        <Link to="/articles">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        
        <div className="space-y-2">
          <h1 className="heading-lg animate-slide-down">{article.title}</h1>
          <p className="text-xl text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            {article.subtitle}
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <img 
          src={`${article.imageUrl}?auto=format&fit=crop&w=1200&q=90`}
          alt={article.title}
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {renderArticleContent()}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t animate-fade-in">
        {prevArticle ? (
          <Link to={`/articles/${prevArticle.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-start">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prevArticle.title}
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextArticle && (
          <Link to={`/articles/${nextArticle.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-end">
              {nextArticle.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Article;
