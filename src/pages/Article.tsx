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
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Generate unique placeholder content based on article ID
  const renderArticleContent = () => {
    switch (article.id) {
      case "immediate-aftermath":
        return (
          <>
            <p>
              Like everyone, I did the wrong thing in the first hours after my
              ex- broke up with me. I begged. I ran away, came back, then ran
              away again. I called non-stop. I texted crazy things. I cried to
              my ex-. I wanted to kill myself. I was certain my life was over.
            </p>
            <p>
              This website is a long and detailed guide to recovering as quickly
              as possible after a breakup or divorce and coming out of it strong
              and complete. As you go through the recovery process, I hope you
              can benefit from all the detail of each article.
            </p>
            <p>
              But in the first hours after the breakup, I know that you’re in
              shock and can barely think straight. So this is a very short
              emergency plan of what you should do immediately, starting now.
              The closer you follow this plan now, the better your life will be
              later.
            </p>
            <h2>Cut off all contact with your partner.</h2>
            <p>
              This is urgent. Any contact you have with him or her right now is
              going to be bad. You’re so emotional that anything you say or do
              will just make things worse.{" "}
            </p>
            <p>
              No phone calls, no smses, no communication at all. Block him/her
              on all social media.
            </p>
            <p>Again: nothing. No contact, not a word. </p>
            <p>
              If s/he is trying to call you, don’t answer. Just send a very
              short text message: “I’m sorry, but I really can’t talk now. I’ll
              contact you when I’m ready." No more than that; nothing personal,
              nothing about your feelings, no questions. Nothing.
            </p>
            <p>And then turn off your phone or block his/her number.</p>
            <p>
              I know it seems cold, but remember: your partner just broke up
              with you. You have no obligation towards him/her anymore.
            </p>
            <p>
              And to the extent that there’s any chance for reconiciliation,
              cutting off contact now will significantly help you and prevent
              you from doing anything you’ll very much regret later.
            </p>
            <h2>Call friends or family and ask for help.</h2>
            <p>
              You shouldn’t be alone. Don’t be anywhere near your partner. If
              you live with your partner, pack a bag and go stay with your
              family or friends. If you work with your partner, take a day off
              and leave immediately.{" "}
            </p>
            <h2>Stay put.</h2>
            <p>
              If you’re going to meet with or stay with friends or family,
              definitely go. Go for a walk if you’d like. But no pointless
              driving; you’re in no state to drive a car. And no spontaneous
              trips to nowhere; it’ll just complicate your life even more.
            </p>
            <h2>No violence.</h2>
            <p>
              Not against your ex-, not against yourself. If you’re thinking of
              suicide, I understand, I went through it too. Please read through
              this site from beginning to end, though; I think it will help you
              understand better what’s happening to you.
            </p>
            <h2>Don’t jump straight into the arms of another person.</h2>
            <p>
              You won’t get any comfort, it serves no purpose for you or as
              revenge, and it could cause serious problems for you, your
              partner, and the new person. You can think about rebound
              relationships later, but it will only be a disaster if you start
              in the immediate aftermath of the breakup. Stay with friends, not
              a lover.
            </p>
            <h2>Alcohol, drugs, food.</h2>
            <p>
              Everyone has their escape of choice. Later down the road, you
              shouldn’t do any of this. But in the first hours or day after a
              breakup, it’d be unrealistic and counter-productive to lecture you
              that you shouldn’t. So just use moderation. No driving. And stay
              with a friend.
            </p>
            <p>
              If you’re following all these steps now, congratulations. You’re
              already doing much better than 99% of people following a breakup.
              It will help a lot.
            </p>
            <p>
              When I was dumped, I hated all the platitudes and clichés people
              told me that I’ll be ok and everything will be great. So I won’t
              bother telling you that.
            </p>
            <p>
              Instead, I simply suggest you take a look through this site when
              you’re ready and learn about the physiology of what you’re
              suffering, how to deal with the pain, and steps to feel better.
              Use the navigation to go to the main{" "}
              <a href="/artcles">article list</a> for this site, or jump
              straight into <a href="/intro">the first article</a>.
            </p>
          </>
        );
      case "intro":
        return (
          <>
            <p>
              The pain I felt when my relationship ended is indescribable. The
              first 6 months was living hell: I was on auto-pilot, completely
              unaware of what I was doing, completely miserable.
            </p>
            <p>
              {" "}
              That period is still a haze, shrouded in the screams of pain while
              I let myself be pulled back and forth by my ex-. The next 12
              months were a bit better, but still a very slow process of
              gradually healing.
            </p>
            <p>
              I suffered more than I could have ever imagined as I let myself be
              hurt by the rejection, then be pulled back and forth by my ex-
              only to be rejected over and over again (I found out later that my
              ex- had been cheating on me, broke up out of guilt but despised
              the new partner and passionately wanted me back, but couldn’t bear
              to hurt me more, so kept pulling me back only to reject me again
              and again thinking it'd be best for me to never know the truth… a
              complete mess, no?).{" "}
            </p>
            <p>
              I let the whole ordeal essentially destroy me and waste my life
              for a year and a half.{" "}
            </p>
            <p>
              It was incomprehensible to me how I was expected to keep going as
              if nothing had happened. Pregnancy, death in the family, serious
              illness… you’re allowed to take time off from work or school. But
              when your heart is broken, you’re supposed to keep on keeping on
              as if nothing happened.
            </p>
            <h2>Endless Sorrow</h2>
            <p>
              For an entire year I cried many times each day (literally). Long
              periods of utter helplessness. Self-pity. Self-hatred. Numb,
              totally dead inside. Utter loneliness and isolation.
            </p>
            <p>
              As I aimlessly walked street after street, I couldn’t understand
              how any person near me could be happy when the world was so
              obviously miserable and life was so pointless. People passed me,
              touched me, but I felt they lived in a different universe from my
              world of unending sadness. Every couple holding hands was a
              personal insult to me.
            </p>
            <p>
              But not just couples were an insult to me. Street-corners, walls
              of buildings, a blade of grass, food, rain, sun… everything in the
              universe was against me, and no one and nothing could understand
              my pain.
            </p>
            <p>
              I had constant thoughts of suicide. And constantly told my friends
              of my hope and dramatically detailed plans to just end the pain
              (my poor poor friends, sigh...).
            </p>
            <p>
              And the irony is that I’ve always been cheerful and active. Just
              goes to show that a bad break-up can destroy anyone.
            </p>
            <h2>No Idea How To Heal</h2>
            <p>
              Nothing in life teaches you what really is happening to you, why
              it's happening to you and what you’re supposed to do when you’ve
              been dumped.
            </p>
            <p>
              A lot of the clichés and platitudes are true (“time heals all
              wounds", “big ocean, lots of fish", “someday you’ll barely
              remember what all the fuss was about"), but they don’t help much
              while you're actually going through it.
            </p>
            <p>
              The endlessly cheerful tone of some friends and self-help guides
              out there struck me as unrealistic and borderline absurd, making
              me discount their message even more while I was suffering. My eyes
              rolled at this type of advice: "Bake something delicious, read
              your favorite book, curl up in a giant blanket and watch your
              favorite romantic Disney movie to remind yourself that love is out
              there… pick one or all three. Take care of yourself."
            </p>
            <p>
              Of course it's decent advice to keep yourself busy and positive,
              but it did nothing to help me understand what was happening to me
              emotionally and physically, or help me to actually get back
              control of my life again and get over it. In fact, it wasn't just
              useless; this type of advice made me even more depressed, because
              it convinced me that I truly was alone in what I was going
              through. If romantic Disney movies and some baking are all it
              takes to help other people over this, then I thought that I must
              be truly unique in my woe.
            </p>
            <p>
              And the traditional academic explanations of what I was going
              through didn’t seem to apply to my situation at all. For example,
              I looked at the{" "}
              <a href="https://en.wikipedia.org/wiki/Five_stages_of_grief">
                Kübler-Ross model
              </a>{" "}
              of the five stages of grief. Of course there were elements of it
              in my feelings and recovery pattern, but I realized that the
              orderly progression through stages it describes had no connection
              to my actual reality. My feelings were all over the place, with
              the emotions coming in massive and very frequent waves; I went
              through many more emotions and stages in one day than the model
              describes occurring over the course of the whole mourning period.
            </p>
            <h2>Recovery Started After Following Good Advice</h2>
            <p>
              I’m embarrassed to admit now how much time I spent on the internet
              reading about break-ups: scientific models of break-up theories,
              break-up and relationship forums, stories and advice. I must have
              spent hundreds of hours on forums engrossed in thousands (tens of
              thousands??) of stories of people who’ve been dumped. I went
              through dozens of academic papers on the topic. Plus I spent lots
              more time on all the psychology magazines, relationship blogs,
              sites by “professionals" who offer paid-for services to help you…
              you name it, I was probably on the site.
            </p>
            <p>
              My friends' cheery platitudes weren't helpful. But the information
              I pieced together on the internet - direct advice from strangers,
              research by academics - was profoundly helpful. I ignored most of
              it at first and continued to wallow in my misery, but eventually I
              started to apply it to my own situation, and little by little I
              healed.
            </p>
            <p>
              I tried to put together in one place everything I learned and
              observed to give you a real, no-BS, no false-cheerfulness guide to
              recovery.
            </p>
            <p>
              It’s true that every relationship is different and your situation
              is truly unique. But it’s also true that it's for the same reasons
              that every one of us suffers the pain of being rejected, and every
              recovery can be helped by the same ideas and strategies.
            </p>
            <p>
              This guide doesn’t have any magic tips; the recovery process is
              going to be painful no matter what you do and how perfectly you
              manage yourself. And no matter what any self-help guide tries to
              sell you, it’s going to take a while, it’s going to hurt, and the
              one thing you think that you most want – to get back together with
              your ex- - is very, very unlikely to happen.
            </p>
            <h2>The Guide: Honest, No nonsense</h2>
            <p>
              In this guide, I try to explain what’s really going on with you
              after a divorce or end of a relationship, describe the best
              strategies to recover as quickly and strongly as possible, show
              what pitfalls to avoid and describe what to do in the common
              tricky situations that come up.
            </p>
            <p>It’s the guide I wish I’d had when I was dumped.</p>
            <h2>Regret For Time Wasted</h2>
            <p>
              Everyone’s memory of their relationship and their break-up will be
              different, obviously. But what will be the same is this: enormous
              regret at how much time following the break-up that you wasted
              wallowing in your own misery. I lost more than one year of my
              life. I am more angry about this than about anything having to do
              with the relationship or the break-up. Being dumped hurts so much,
              but you will heal. Everyone does eventually. The real question is
              how much time you’re going to waste before you do… and how many
              other important things you’ll destroy in the process, like
              friendships, family ties, school/career, your health, and more.
            </p>
            <h2>Control Your Recovery</h2>
            <p>
              There are a lot of things you can do to minimize the pain and
              speed up your recovery. Everyone makes mistakes in the recovery
              process, everyone goes through the begging and pleading stages,
              everyone wallows and feels self-pity and self-hatred. But the
              sooner you can understand what’s happening to you and really stick
              to the basic ideas I describe here, the sooner you’re going to
              heal and be back to yourself.
            </p>
            <p>
              The good news is that when your recovery is over, you’ll end up as
              a better version of yourself than you were before.
            </p>
            <p>
              I know that for me, I’ve grown so much. I looked into the abyss of
              sadness, betrayal and loneliness, and I realized that I can
              survive, grow and thrive. I’m proud that I went through such a
              difficult ordeal and came out of it stronger, more confident of
              myself, and a better, deeper, and more empathetic person.
            </p>
            <p>
              I've been thrilled to see how many people this site has helped. I
              truly mean it when I say that I've been humbled by the response.
              Thousands of people have corresponded with me about their
              situations. Their perspectives are invaluable and I've learned so
              much from their depth and honesty, both directly about breakup
              pain and indirectly about the strength we all have in the face of
              emotional turmoil, and I've built the insight from their
              experiences into the current version of this site.
            </p>
            <p>
              Some of the readers have also allowed their messages (with
              identifying details removed) and my initial response to be shown
              on this site publicly so that others can benefit. The database of
              messages is searchable, so you can look for stories by age,
              gender, relationship length, issues such as first love, divorce,
              broken engagement, extreme sadness, etc. Take a look on the
              comments page if you're interested; you'll see that you're
              definitely not alone.
            </p>
            <p>
              Because of not just my own experience, but more importantly the
              incredible depth and range of experiences I've been exposed to
              through this site, I’m positive that you'll also get through it
              and come out as a better person. Bad moments and setbacks will
              inevitably occur, but little by little you will emerge from the
              pain of this breakup to find that you've become a stronger, more
              self-confident version of who you were before.
            </p>
            <h2>100% Free</h2>
            <p>
              My goal with this guide is to help anyone who can benefit from
              these words. It's my way to pay forward all the help I got from
              unknown strangers on the internet. It's completely and totally
              free. Take anything here, use it, copy it, pass it around in any
              way you want.
            </p>
            <p>
              But no commercial use, please. I’m so outraged by the numerous
              commercial sites selling miracle break-up solutions that it’d be
              particularly grating to me if my own words are used to take
              advantage of people suffering from a break-up. If you do see it
              copied and used in any commercial way, please let me know.
            </p>
            <p>
              I wrote this site on my own, for free, with no desire to get any
              compensation at all other than the satisfaction of helping others.
              There is no marketing, no advertising, no donation buttons. I've
              done no special advertising, social media promotions or links. On
              purpose, I don't emphasize myself or link to anything about me. As
              the site has become more popular and bubbled upward in search
              rankings, marketers have found it and made me numerous offers to
              "monetize" it, but I've refused them all. I want the message here
              to be clear, free and without any hint of ulterior motive; the
              last thing someone who is suffering from a break-up should face is
              a deluge of marketing and self-promotion.
            </p>
            <p>
              This guide is made of many separate articles, each of which covers
              an important topic in the recovery process. You can read each
              topic on its own and then return to the{" "}
              <a href="/articles">Topic List</a> page to select another topic.
              Or you can start with the{" "}
              <a href="/articles/pain-is-real">first topic</a> and progress
              sequentially through each article to cover the entire guide.
            </p>
            <p>
              I wish you the best of luck. In the darkest moments of post
              breakup sadness it might seem impossible to believe, but please
              trust me that your pain will eventually fade, all of this will
              just be a memory, and you will come out stronger and your life
              will be better because of the experience.
            </p>
          </>
        );

      case "pain-is-real":
        return (
          <>
            <p>
              When you're going through a breakup, the pain you feel is not just
              emotional—it's physical too. Neuroscience research shows that
              social rejection activates many of the same brain regions involved
              in physical pain, which is why a broken heart can literally hurt.
            </p>
            <h2>The Science Behind Breakup Pain</h2>
            <p>
              fMRI studies have shown that the same regions of the brain that
              process physical pain—the anterior cingulate cortex and insula—are
              active when people experience social rejection. This is why
              experts now recognize that emotional pain is processed by your
              brain in a very similar way to physical injuries.
            </p>
            <p>
              Understanding that your pain has a neurobiological basis is
              important because it validates your experience. You're not
              overreacting or being dramatic—your brain is responding to a
              genuine threat to your well-being.
            </p>
            <h2>Common Physical Symptoms</h2>
            <p>
              Many people experience physical symptoms during a breakup that
              mirror those of physical illness or injury:
            </p>
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
            <p>
              One of the most common questions after a breakup is "How long will
              it take me to get over this?" While there's no universal timetable
              for recovery, research and experience suggest some general
              patterns and factors that influence healing time.
            </p>
            <h2>Factors That Affect Recovery Time</h2>
            <p>
              The duration of your recovery period depends on several variables
              unique to your situation:
            </p>
            <ul>
              <li>
                Length of the relationship: Generally, longer relationships take
                longer to recover from
              </li>
              <li>
                Intensity of the connection: Deep emotional investment can
                extend healing time
              </li>
              <li>
                Circumstances of the breakup: Sudden or traumatic endings may
                require more processing
              </li>
              <li>
                Your support system: Strong social support can accelerate
                healing
              </li>
              <li>
                Previous relationship patterns: Recurring relationship issues
                may extend recovery
              </li>
            </ul>
            <h2>General Timeframes</h2>
            <p>
              While everyone is different, research suggests that significant
              emotional recovery often occurs within the following ranges:
            </p>
            <p>
              Recent studies indicate that most people see substantial
              improvement in their emotional state between 3-6 months
              post-breakup, with more complete recovery taking about a year for
              relationships that lasted more than a year.
            </p>
          </>
        );

      case "no-contact":
        return (
          <>
            <p>
              The No Contact rule is one of the most effective strategies for
              healing after a breakup. It involves completely cutting off
              communication with your ex-partner for a period of time—typically
              at least 30 days, but often longer depending on the situation.
            </p>
            <h2>Why No Contact Works</h2>
            <p>
              Each time you interact with your ex, you reactivate the attachment
              system in your brain, effectively reopening emotional wounds that
              were beginning to heal. Neuroscience shows that contact with an ex
              can trigger the release of bonding hormones like oxytocin and
              dopamine, reinforcing your emotional dependency.
            </p>
            <p>
              No Contact allows your brain to begin breaking these neurochemical
              bonds by preventing the regular reinforcement of these pathways.
              Think of it as letting a physical wound heal without constantly
              removing the bandage and exposing it to infection.
            </p>
            <h2>The Benefits of No Contact</h2>
            <ul>
              <li>
                Accelerates emotional healing by preventing re-traumatization
              </li>
              <li>Helps reduce obsessive thoughts and rumination</li>
              <li>
                Provides space to rebuild your identity separate from the
                relationship
              </li>
              <li>
                Prevents the "hope trap" of interpreting casual contact as signs
                of reconciliation
              </li>
              <li>Allows you to regain emotional stability and perspective</li>
            </ul>
          </>
        );

      case "remove-reminders":
        return (
          <>
            <p>
              One of the most practical yet emotionally challenging steps in
              breakup recovery is removing physical reminders of your ex-partner
              from your daily environment.
            </p>
            <h2>Why Reminders Hurt</h2>
            <p>
              Research in cognitive psychology shows that environmental cues
              trigger associated memories and emotions. Each photo, gift, or
              item connected to your ex serves as a stimulus that can instantly
              activate the neural pathways associated with your relationship,
              causing emotional flooding.
            </p>
            <p>
              This isn't just psychological - studies using fMRI scans have
              demonstrated that viewing images of ex-partners activates brain
              regions associated with physical pain and craving, similar to
              what's observed in drug withdrawal.
            </p>
            <h2>What to Remove</h2>
            <p>
              Consider addressing these common triggers in your environment:
            </p>
            <ul>
              <li>Photos on walls, shelves, and digital devices</li>
              <li>Gifts, letters, and cards</li>
              <li>
                Clothing items that belonged to your ex or that remind you of
                them
              </li>
              <li>
                Digital content: emails, text message threads, social media
                connections
              </li>
              <li>Shared playlists or meaningful songs</li>
              <li>
                Items that remind you of significant memories or trips together
              </li>
            </ul>
            <h2>The "Box Method"</h2>
            <p>
              If you're not ready to permanently discard meaningful items,
              consider the box method: place everything in a sealed container
              and store it somewhere not easily accessible. This creates
              physical and psychological distance while allowing you the option
              to revisit these items when you've healed.
            </p>
            <p>
              Remember that removing reminders isn't about erasing your
              past—it's about creating space for your present healing and future
              growth.
            </p>
          </>
        );

      case "contact-from-ex":
        return (
          <>
            <p>
              When your ex reaches out to you during the healing process, it can
              trigger intense confusion and emotional turbulence. Understanding
              how to handle this situation is crucial for maintaining your
              recovery progress.
            </p>
            <h2>Common Reasons Exes Make Contact</h2>
            <p>
              Before responding, it's helpful to understand the typical
              motivations behind an ex's outreach:
            </p>
            <ul>
              <li>Genuine concern about your wellbeing</li>
              <li>Lingering guilt about how things ended</li>
              <li>Testing the waters to see if reconciliation is possible</li>
              <li>Seeking validation or ego gratification</li>
              <li>
                Habit and familiarity (you were their go-to person for so long)
              </li>
              <li>Practical matters that need resolution</li>
            </ul>
            <h2>Interpreting Their Messages</h2>
            <p>
              Be careful not to over-interpret neutral messages as signs they
              want to reconcile. "How are you doing?" rarely means "I want you
              back." People who genuinely want reconciliation typically
              communicate that intention clearly.
            </p>
            <h2>Responding Strategies</h2>
            <p>
              Consider these approaches based on where you are in your healing:
            </p>
            <ul>
              <li>
                No response: Perfectly acceptable if you're still vulnerable
              </li>
              <li>
                Delayed response: Wait 24-48 hours to respond to break automatic
                patterns
              </li>
              <li>
                Brief, neutral response: Keep it factual and emotionally
                detached
              </li>
              <li>
                Boundaries statement: Clearly communicate your need for space
              </li>
            </ul>
            <p>
              Remember that protecting your healing process takes priority over
              being polite or responsive to your ex.
            </p>
          </>
        );

      case "bumping-into-ex":
        return (
          <>
            <p>
              Unexpectedly encountering your ex in public can trigger an intense
              stress response, regardless of how much healing you've done.
              Preparing for this possibility can help you handle the situation
              with dignity and minimize emotional setbacks.
            </p>
            <h2>Physiological Reactions</h2>
            <p>
              When you see your ex unexpectedly, your body often reacts before
              your conscious mind does. Common physiological responses include:
            </p>
            <ul>
              <li>Elevated heart rate and blood pressure</li>
              <li>Shallow breathing or feeling like you can't breathe</li>
              <li>Stomach churning or nausea</li>
              <li>Flushing or sudden sweating</li>
              <li>Fight-or-flight response activation</li>
            </ul>
            <p>
              These reactions are normal and don't indicate a setback in your
              healing—they're just your body's protective mechanisms at work.
            </p>
            <h2>Preparation Strategies</h2>
            <p>
              If you know you might encounter your ex in certain locations, try
              these preemptive approaches:
            </p>
            <ul>
              <li>Mentally rehearse brief, neutral exchanges</li>
              <li>Plan alternate routes or timing for shared locations</li>
              <li>
                Bring a supportive friend if you know your ex might be at an
                event
              </li>
              <li>
                Practice grounding techniques for managing anxiety in the moment
              </li>
            </ul>
            <h2>In-the-Moment Tactics</h2>
            <p>
              If you do encounter them unexpectedly, remember these tactics:
            </p>
            <ul>
              <li>
                Brief acknowledgment is sufficient—you don't owe them a
                conversation
              </li>
              <li>Focus on your breathing to stay calm</li>
              <li>
                Keep the interaction time-limited ("Nice to see you, but I need
                to get going")
              </li>
              <li>
                Resist the urge to either appear "totally fine" or to show how
                hurt you are
              </li>
            </ul>
          </>
        );

      case "initiating-no-contact":
        return (
          <>
            <p>
              Starting a No Contact period can be one of the most challenging
              but crucial decisions in your breakup recovery. This article
              outlines how to implement this strategy effectively and with
              minimum drama.
            </p>
            <h2>When to Begin No Contact</h2>
            <p>
              The ideal time to start No Contact is immediately after the
              breakup, but it's never too late to implement it. Many people
              attempt to maintain friendship or regular communication before
              realizing it's hindering their healing.
            </p>
            <p>Signs you should implement No Contact immediately:</p>
            <ul>
              <li>You feel emotional destabilization after interactions</li>
              <li>You're constantly checking their social media</li>
              <li>
                You're interpreting friendly messages as signs of reconciliation
              </li>
              <li>
                You find yourself crafting messages designed to elicit specific
                responses
              </li>
              <li>
                Your mood significantly depends on when/how they communicate
                with you
              </li>
            </ul>
            <h2>How to Communicate Your Decision</h2>
            <p>
              While some advocate for a clear explanation, others recommend
              simply fading communication. Your approach should depend on your
              specific situation and relationship dynamics:
            </p>
            <p>
              Sample explanation message: "I've realized I need some space to
              process the end of our relationship. I'll be taking some time
              without contact to focus on my healing. This isn't about punishing
              you—it's about taking care of myself. I hope you can respect this
              boundary."
            </p>
            <h2>Addressing Practical Matters First</h2>
            <p>
              Before beginning No Contact, resolve any urgent practical matters:
            </p>
            <ul>
              <li>Exchanging personal belongings</li>
              <li>Addressing shared financial responsibilities</li>
              <li>Clarifying arrangements for shared pets</li>
              <li>Communicating with mutual friends about your boundaries</li>
            </ul>
          </>
        );

      case "closure":
        return (
          <>
            <p>
              After a breakup, many people fixate on getting "closure"—a final
              conversation or explanation that will supposedly allow them to
              move on. However, the concept of closure as most people understand
              it is largely a myth that can actually hinder healing.
            </p>
            <h2>The Closure Misconception</h2>
            <p>We often believe we need answers to questions like:</p>
            <ul>
              <li>"What did I do wrong?"</li>
              <li>"When exactly did your feelings change?"</li>
              <li>"Is there someone else?"</li>
              <li>"Did you ever really love me?"</li>
            </ul>
            <p>
              The problem is that even when we get answers to these questions,
              they rarely satisfy our emotional need for resolution. This is
              because:
            </p>
            <ul>
              <li>
                Your ex's perception of what happened is subjective and may not
                align with reality
              </li>
              <li>
                People often don't fully understand their own motivations for
                ending relationships
              </li>
              <li>
                The answers you receive might be crafted to minimize guilt
                rather than provide truth
              </li>
              <li>
                Many relationship endings are complex and cannot be reduced to
                simple explanations
              </li>
            </ul>
            <h2>True Closure Comes From Within</h2>
            <p>
              Genuine closure is not something another person can give you—it's
              an internal process of:
            </p>
            <ul>
              <li>
                Accepting that the relationship is over, regardless of whether
                you understand all the reasons
              </li>
              <li>Processing your grief about the loss</li>
              <li>
                Integrating the relationship experience into your life story
              </li>
              <li>Creating your own meaning from what happened</li>
              <li>Recognizing that ambiguity is part of human relationships</li>
            </ul>
          </>
        );

      case "ex-special-occasions":
        return (
          <>
            <p>
              Navigating your ex's special occasions—birthdays, achievements,
              holidays—presents a challenging emotional dilemma during breakup
              recovery. Should you acknowledge these events or maintain strict
              No Contact? There's no universal answer, but there are important
              considerations to guide your decision.
            </p>
            <h2>The Healing Timeline Factor</h2>
            <p>
              Where you are in your healing journey should heavily influence
              your approach:
            </p>
            <ul>
              <li>
                Early recovery (0-3 months): Generally best to maintain No
                Contact even during special occasions
              </li>
              <li>
                Mid-recovery (3-6 months): Evaluate your emotional reaction to
                thinking about reaching out
              </li>
              <li>
                Later recovery (6+ months): More flexibility based on your
                current feelings and relationship history
              </li>
            </ul>
            <h2>Types of Acknowledgments</h2>
            <p>
              If you do decide to acknowledge an occasion, consider the
              emotional implications of different approaches:
            </p>
            <ul>
              <li>
                Text message: Lower emotional investment, but opens door to
                response
              </li>
              <li>
                Email: More formal, allows for thoughtfulness without immediate
                response pressure
              </li>
              <li>
                Card: Traditional and kind, but requires physical information
              </li>
              <li>
                Social media comment: Public, can be seen by others (including
                potential new partners)
              </li>
              <li>
                Gift: Generally too intimate unless you've established a healthy
                friendship
              </li>
            </ul>
            <h2>Message Content Guidelines</h2>
            <p>
              If you choose to send a message, keep these guidelines in mind:
            </p>
            <ul>
              <li>Keep it brief and genuinely well-wishing</li>
              <li>
                Avoid inside jokes or reminiscing about shared experiences
              </li>
              <li>Don't include questions that invite a conversation</li>
              <li>Focus on the occasion, not your relationship</li>
              <li>Send with zero expectations of response</li>
            </ul>
          </>
        );

      case "ex-with-new-partner":
        return (
          <>
            <p>
              Finding out your ex has a new partner can trigger an intense
              emotional reaction, even if you've been making good progress in
              your recovery. This situation often feels like a secondary
              rejection and can resurface grief you thought you'd already
              processed.
            </p>
            <h2>Common Emotional Reactions</h2>
            <p>
              First, understand that your emotional response—whatever it may
              be—is normal and valid:
            </p>
            <ul>
              <li>Pain and jealousy, even if you don't want your ex back</li>
              <li>
                Comparative thinking ("What does this person have that I
                don't?")
              </li>
              <li>Obsessive curiosity about the new relationship</li>
              <li>Feelings of replacement or replaceability</li>
              <li>Anger if it appears they moved on "too quickly"</li>
              <li>
                Destabilization of the meaning you've created about the breakup
              </li>
            </ul>
            <h2>The Rebound Question</h2>
            <p>
              Many people find comfort in labeling their ex's new relationship
              as a "rebound," but this focus can become a distraction from your
              own healing. Whether it's a rebound or not:
            </p>
            <ul>
              <li>It doesn't change your current reality</li>
              <li>
                Analyzing their relationship keeps you emotionally engaged with
                your ex
              </li>
              <li>
                The outcome of their new relationship has no bearing on your
                worth
              </li>
            </ul>
            <h2>Coping Strategies</h2>
            <p>To handle this challenging trigger point in your recovery:</p>
            <ul>
              <li>Temporarily intensify self-care practices</li>
              <li>Limit information about your ex and their new partner</li>
              <li>
                Acknowledge the pain without judging yourself for feeling it
              </li>
              <li>
                Remind yourself that your ex's choices reflect them, not you
              </li>
              <li>
                Focus on the reality of your relationship, not an idealized
                version
              </li>
            </ul>
          </>
        );

      case "getting-back-together":
        return (
          <>
            <p>
              The desire to reconcile with an ex is one of the most powerful
              forces during breakup recovery. While most breakups remain
              permanent, understanding the realistic parameters around
              reconciliation can help you make healthier decisions during this
              vulnerable time.
            </p>
            <h2>Statistical Reality</h2>
            <p>
              Research indicates that approximately 50% of couples who break up
              will attempt reconciliation at some point, but only about 15% of
              relationships that reconcile achieve long-term success. These
              numbers are important context when evaluating your situation.
            </p>
            <h2>When Reconciliation Might Work</h2>
            <p>
              Successful reconciliations typically share certain
              characteristics:
            </p>
            <ul>
              <li>
                The issues that caused the breakup were situational rather than
                fundamental compatibility problems
              </li>
              <li>
                Both people have done significant individual work on themselves
              </li>
              <li>
                Enough time has passed to gain perspective (typically at least
                3-6 months)
              </li>
              <li>
                Both partners enter reconciliation with realistic expectations,
                not idealization
              </li>
              <li>
                There's willingness to address old patterns directly with new
                tools (often with professional help)
              </li>
              <li>
                Neither person is returning out of fear, loneliness, or
                convenience
              </li>
            </ul>
            <h2>Warning Signs of Problematic Reconciliation</h2>
            <p>Be cautious if these factors are present:</p>
            <ul>
              <li>
                The reconciliation follows a pattern of breaking up and getting
                back together
              </li>
              <li>You're returning primarily out of fear of being alone</li>
              <li>One person is significantly more invested than the other</li>
              <li>
                The fundamental problems that led to the breakup haven't been
                addressed
              </li>
              <li>
                You're hoping the other person will have drastically changed
              </li>
            </ul>
          </>
        );

      case "friends-family-support":
        return (
          <>
            <p>
              Social support is one of the most powerful factors in breakup
              recovery. Research consistently shows that people who maintain
              strong connections during this difficult time heal faster and
              experience less severe depression symptoms than those who isolate
              themselves.
            </p>
            <h2>The Different Types of Support You Need</h2>
            <p>
              Not all social support serves the same purpose. For optimal
              recovery, try to cultivate relationships that provide:
            </p>
            <ul>
              <li>
                Emotional support: People who validate your feelings and provide
                comfort
              </li>
              <li>
                Practical support: Those who help with daily tasks when you're
                struggling
              </li>
              <li>
                Informational support: Sources of useful advice and perspective
              </li>
              <li>
                Companionship support: Friends who help you engage in positive
                activities
              </li>
            </ul>
            <p>
              Few people can provide all these types of support, which is why a
              diverse support network is valuable.
            </p>
            <h2>Support System Pitfalls to Avoid</h2>
            <p>
              Be mindful of these common issues with post-breakup support
              networks:
            </p>
            <ul>
              <li>Exclusively venting without moving toward problem-solving</li>
              <li>Friends who encourage rumination or unhealthy behaviors</li>
              <li>
                People who pressure you to "just get over it" before you're
                ready
              </li>
              <li>
                Over-reliance on a single person for all your emotional needs
              </li>
              <li>Isolating yourself to avoid burdening others</li>
            </ul>
            <h2>When Your Support System Fails You</h2>
            <p>
              If your existing network isn't providing what you need, consider:
            </p>
            <ul>
              <li>Online support groups specific to breakup recovery</li>
              <li>Professional therapy or counseling</li>
              <li>Structured recovery programs</li>
              <li>
                Community organizations and activity groups to build new
                connections
              </li>
            </ul>
          </>
        );

      case "mental-work":
        return (
          <>
            <p>
              While external actions like No Contact are important, the most
              crucial work happens inside your mind. Developing mental
              discipline and new thought patterns is the foundation of breakup
              recovery and future relationship success.
            </p>
            <h2>Thought Management Techniques</h2>
            <p>
              Our minds naturally ruminate on painful experiences, but these
              techniques can help redirect your focus:
            </p>
            <ul>
              <li>
                Thought stopping: When you catch yourself in rumination,
                mentally say "STOP" and immediately engage in a different
                activity
              </li>
              <li>
                Scheduled worry time: Designate specific times to process
                breakup thoughts, redirecting them outside that time
              </li>
              <li>
                Mental compartmentalization: Visualize placing breakup thoughts
                in a container to address later
              </li>
              <li>
                Present-moment anchoring: Use your five senses to bring yourself
                back to the present moment
              </li>
            </ul>
            <h2>Cognitive Restructuring</h2>
            <p>
              Many post-breakup thoughts contain cognitive distortions that
              intensify pain. Learn to identify and challenge these patterns:
            </p>
            <ul>
              <li>
                Catastrophizing: "I'll never find love again" → "This pain is
                temporary and many people find fulfilling relationships after
                breakups"
              </li>
              <li>
                Mind-reading: "They never really loved me" → "I can't know
                exactly what they felt, only what they showed through actions"
              </li>
              <li>
                All-or-nothing thinking: "The entire relationship was a waste" →
                "There were both valuable and painful aspects of this
                relationship"
              </li>
              <li>
                Emotional reasoning: "I feel unlovable, so I must be unlovable"
                → "Feeling unlovable is a common breakup reaction, not a
                reflection of reality"
              </li>
            </ul>
            <h2>Identity Reconstruction</h2>
            <p>
              A crucial mental task is rebuilding your sense of self separate
              from the relationship:
            </p>
            <ul>
              <li>Reconnect with pre-relationship interests and values</li>
              <li>
                Explore aspects of yourself that were underdeveloped during the
                relationship
              </li>
              <li>
                Create future-focused goals unrelated to romantic relationships
              </li>
              <li>
                Practice self-definition exercises: "Who am I beyond my
                relationship status?"
              </li>
            </ul>
          </>
        );

      case "never-another-love":
        return (
          <>
            <p>
              The belief that you'll never find love again is one of the most
              painful and persistent thoughts during breakup recovery. This fear
              feels rational in the moment but is almost always a product of
              grief rather than reality.
            </p>
            <h2>Why We Believe This Myth</h2>
            <p>
              Several psychological factors contribute to the "never another
              love" belief:
            </p>
            <ul>
              <li>
                Recency bias: Our minds overweight recent experiences and
                emotions
              </li>
              <li>
                Fear response: The pain of loss triggers protective mechanisms
                to avoid future pain
              </li>
              <li>
                Idealization: Post-breakup, we often remember only the best
                aspects of our ex
              </li>
              <li>
                Identity merger: When relationships become our primary identity,
                their loss feels catastrophic
              </li>
              <li>
                Narrowed time perspective: Emotional pain collapses our sense of
                future possibilities
              </li>
            </ul>
            <h2>Statistical Reality</h2>
            <p>
              While statistics can't predict your individual journey, they offer
              helpful perspective:
            </p>
            <ul>
              <li>
                The vast majority of people (over 85%) have more than one
                significant relationship in their lifetime
              </li>
              <li>
                Most people who want to find love again do so within 1-2 years
                after a serious breakup
              </li>
              <li>
                Many report that their subsequent relationships are healthier
                and more fulfilling than previous ones
              </li>
            </ul>
            <h2>The "Special Connection" Question</h2>
            <p>
              Many people fixate on the unique connection they had with their
              ex, believing such chemistry is irreplaceable. The truth is:
            </p>
            <ul>
              <li>
                Different doesn't mean lesser—future connections will have their
                own unique qualities
              </li>
              <li>
                The neurochemistry of attachment creates the feeling of an
                irreplaceable bond in every significant relationship
              </li>
              <li>
                What feels like "once in a lifetime chemistry" is often a
                combination of compatibility and relationship patterns
              </li>
            </ul>
          </>
        );

      case "revenge":
        return (
          <>
            <p>
              The desire for revenge after a painful breakup—especially one
              involving betrayal—is a natural human response. Understanding
              these impulses can help you channel them constructively rather
              than destructively.
            </p>
            <h2>The Psychology of Revenge Desires</h2>
            <p>Revenge fantasies serve several psychological functions:</p>
            <ul>
              <li>
                They temporarily restore a sense of power when you're feeling
                powerless
              </li>
              <li>They provide emotional release for intense anger and hurt</li>
              <li>They represent a desire for justice and accountability</li>
              <li>
                They can be an attempt to make the other person understand your
                pain
              </li>
            </ul>
            <p>
              These thoughts become problematic only when they transition from
              fleeting fantasies to obsessive planning or actual vengeful
              behaviors.
            </p>
            <h2>The Cost of Acting on Revenge</h2>
            <p>
              Research and experience consistently show that acting on revenge
              impulses:
            </p>
            <ul>
              <li>
                Prolongs your emotional attachment to the ex and the breakup
              </li>
              <li>
                Reinforces a victim identity rather than promoting healing
              </li>
              <li>Often escalates conflict rather than providing closure</li>
              <li>Can damage your reputation and relationships with others</li>
              <li>Rarely delivers the emotional satisfaction you anticipate</li>
            </ul>
            <h2>Healthier Alternatives</h2>
            <p>Instead of acting on revenge impulses, try these approaches:</p>
            <ul>
              <li>Journal your revenge fantasies rather than acting on them</li>
              <li>
                Channel anger into physical activity or creative expression
              </li>
              <li>
                Practice radical acceptance of the injustice you've experienced
              </li>
              <li>
                Focus on "living well" as the best response to mistreatment
              </li>
              <li>
                Consider whether forgiveness (which doesn't mean excusing
                behavior) might serve your healing
              </li>
            </ul>
          </>
        );

      case "alcohol-drugs-medicine":
        return (
          <>
            <p>
              The intense emotional pain of a breakup naturally drives many
              people to seek relief through substances. Understanding both the
              appeal and risks of this approach is crucial for healthy recovery.
            </p>
            <h2>Why Substances Seem Like a Solution</h2>
            <p>
              The neurochemical basis of breakup pain makes substance use
              particularly tempting because:
            </p>
            <ul>
              <li>
                Alcohol temporarily increases dopamine and serotonin, mimicking
                the neurochemistry of attachment
              </li>
              <li>
                Certain substances can temporarily dull the acute pain of loss
              </li>
              <li>
                Sleep aids seem to offer escape from insomnia and rumination
              </li>
              <li>
                Stimulants can counteract the physical fatigue that accompanies
                grief
              </li>
            </ul>
            <h2>The Substance Trap</h2>
            <p>
              Research shows that self-medication during breakup recovery
              creates several problems:
            </p>
            <ul>
              <li>
                Interferes with the natural emotional processing needed for
                healing
              </li>
              <li>
                Creates rebound anxiety/depression when substances wear off
              </li>
              <li>
                Can lead to psychological dependence as a coping mechanism
              </li>
              <li>
                Often results in impulsive behaviors you later regret (e.g.,
                drunk texting)
              </li>
              <li>
                Extends the overall recovery timeline by masking rather than
                addressing feelings
              </li>
            </ul>
            <h2>Medication Considerations</h2>
            <p>
              While self-medication is problematic, there are legitimate roles
              for professional medical intervention:
            </p>
            <ul>
              <li>
                Short-term sleep aids (under medical supervision) for severe
                insomnia
              </li>
              <li>
                Treatment for clinical depression that extends beyond normal
                grief
              </li>
              <li>
                Anxiety management for those with pre-existing anxiety disorders
              </li>
            </ul>
            <p>
              The key difference is professional assessment, appropriate dosing,
              and integration with other recovery approaches.
            </p>
          </>
        );

      case "health":
        return (
          <>
            <p>
              The physical impact of a breakup is often underestimated. Your
              body experiences the end of a significant relationship as a major
              stressor, triggering numerous physiological responses that can
              affect your health and wellbeing.
            </p>
            <h2>Common Physical Symptoms</h2>
            <p>
              Research has documented these frequent physical responses to
              breakups:
            </p>
            <ul>
              <li>Sleep disruption (insomnia or hypersomnia)</li>
              <li>Changes in appetite (significant increase or decrease)</li>
              <li>Digestive issues (stomach pain, nausea, IBS flares)</li>
              <li>Increased inflammatory markers in the blood</li>
              <li>
                Compromised immune function and increased illness susceptibility
              </li>
              <li>Fatigue and reduced energy levels</li>
              <li>Muscle tension and physical pain</li>
            </ul>
            <h2>The HPA Axis Response</h2>
            <p>
              Many of these symptoms stem from activation of your body's stress
              response system (HPA axis), which triggers cortisol release. While
              this response is adaptive for short-term threats, prolonged
              activation during the weeks and months of breakup recovery can
              lead to physical health issues.
            </p>
            <h2>Physical Self-Care Priorities</h2>
            <p>
              These fundamental physical practices can significantly impact your
              recovery speed:
            </p>
            <ul>
              <li>
                Sleep hygiene: Maintain consistent sleep schedule and bedtime
                routine
              </li>
              <li>
                Balanced nutrition: Focus on anti-inflammatory foods and regular
                eating patterns
              </li>
              <li>
                Hydration: Cortisol causes water retention and dehydration
              </li>
              <li>
                Movement: Regular exercise reduces stress hormones and increases
                endorphins
              </li>
              <li>
                Relaxation practices: Techniques that activate the
                parasympathetic nervous system
              </li>
            </ul>
            <p>
              Even when emotionally difficult, prioritizing these physical
              aspects of recovery creates a foundation for emotional healing.
            </p>
          </>
        );

      case "activities":
        return (
          <>
            <p>
              After a breakup, you suddenly find yourself with blocks of time
              that were previously dedicated to your relationship. How you fill
              this time significantly impacts your recovery process and future
              growth.
            </p>
            <h2>The Empty Calendar Challenge</h2>
            <p>
              The sudden availability in your schedule creates several
              challenges:
            </p>
            <ul>
              <li>
                Unstructured time often leads to rumination and overthinking
              </li>
              <li>
                Activities you previously enjoyed together may now trigger
                painful memories
              </li>
              <li>Social events can feel intimidating when attending alone</li>
              <li>
                Weekends and holidays that were relationship-focused now require
                new traditions
              </li>
            </ul>
            <h2>Strategic Activity Planning</h2>
            <p>
              Research on breakup recovery suggests balancing three types of
              activities:
            </p>
            <ul>
              <li>
                Continuity activities: Maintaining pre-existing routines and
                interests that weren't centered on the relationship
              </li>
              <li>
                Rediscovery activities: Returning to hobbies and interests that
                may have been sidelined during the relationship
              </li>
              <li>
                Discovery activities: Exploring entirely new experiences that
                help develop your post-relationship identity
              </li>
            </ul>
            <h2>Specific Activity Suggestions</h2>
            <p>Consider these evidence-backed activities for healing:</p>
            <ul>
              <li>
                Physical activities that release endorphins and require focus
                (hiking, sports, dance)
              </li>
              <li>
                Creative expression outlets (journaling, art, music, cooking)
              </li>
              <li>
                Learning-based activities that create a sense of progress and
                accomplishment
              </li>
              <li>
                Structured social activities that don't revolve around dating
                (classes, volunteer work, group hobbies)
              </li>
              <li>Mindfulness practices that build present-moment awareness</li>
            </ul>
          </>
        );

      case "rebound-relationships":
        return (
          <>
            <p>
              The question of whether to engage in casual dating or new
              relationships after a breakup is complex and highly individual.
              Understanding the potential benefits and pitfalls can help you
              make choices aligned with your long-term healing.
            </p>
            <h2>What Research Shows About Rebounds</h2>
            <p>
              Contrary to popular wisdom, research has found that rebound
              relationships:
            </p>
            <ul>
              <li>
                Can increase confidence and perceived desirability after
                rejection
              </li>
              <li>
                May accelerate detachment from ex-partners for some people
              </li>
              <li>Often provide distraction from rumination and loneliness</li>
              <li>But may also delay necessary emotional processing</li>
              <li>
                And can lead to relationship patterns repeating if underlying
                issues remain unaddressed
              </li>
            </ul>
            <h2>The Self-Awareness Factor</h2>
            <p>
              The impact of new relationships after a breakup largely depends on
              your level of self-awareness about:
            </p>
            <ul>
              <li>Your current emotional state and healing progress</li>
              <li>Your motivations for seeking connection</li>
              <li>The relationship patterns you tend to repeat</li>
              <li>
                Your capacity for honesty with both yourself and new partners
              </li>
            </ul>
            <h2>Ethical Considerations</h2>
            <p>If you do choose to date during your recovery period:</p>
            <ul>
              <li>
                Be transparent with new partners about your recent breakup
              </li>
              <li>
                Check your motivations—seeking validation is natural but
                potentially harmful
              </li>
              <li>
                Avoid using new relationships primarily to make your ex jealous
              </li>
              <li>
                Be careful about making comparisons between new partners and
                your ex
              </li>
              <li>
                Consider whether you're genuinely available for connection or
                still emotionally occupied
              </li>
            </ul>
          </>
        );

      case "language":
        return (
          <>
            <p>
              The words you use—both in conversation with others and in your
              internal dialogue—profoundly shape your experience of breakup
              recovery. Linguistic shifts are powerful tools for healing and
              creating healthy detachment.
            </p>
            <h2>Relationship Tense</h2>
            <p>
              One of the most important linguistic changes involves shifting
              from present to past tense when referring to your relationship:
            </p>
            <ul>
              <li>"We love hiking together" → "We loved hiking together"</li>
              <li>
                "He is so thoughtful" → "He was thoughtful during our
                relationship"
              </li>
              <li>
                "Our song is playing" → "That song was significant in our
                relationship"
              </li>
            </ul>
            <p>
              This shift feels painful initially but helps your brain process
              the reality of the relationship's end.
            </p>
            <h2>Ownership Language</h2>
            <p>Another crucial shift involves changing possessive language:</p>
            <ul>
              <li>
                "My boyfriend/girlfriend" → "My ex" or simply using their name
              </li>
              <li>
                "Our apartment" → "The apartment I used to share with [Name]"
              </li>
              <li>
                "Our friends" → "Friends I met through my relationship" or just
                "friends"
              </li>
            </ul>
            <h2>Identity-Forming Language</h2>
            <p>
              Pay attention to how you describe yourself in relation to the
              breakup:
            </p>
            <ul>
              <li>
                Using temporary language: "I'm going through a breakup" vs. "I'm
                broken"
              </li>
              <li>
                Avoiding global self-judgments: "That relationship didn't work
                out" vs. "I'm a failure at relationships"
              </li>
              <li>
                Future-oriented statements: "I'm learning what I need in my next
                relationship" vs. "No one will ever love me again"
              </li>
            </ul>
            <h2>Communication About Your Ex</h2>
            <p>How you speak about your ex to others affects your healing:</p>
            <ul>
              <li>
                Balanced characterizations avoid both idealization and
                demonization
              </li>
              <li>Acknowledging your role without excessive self-blame</li>
              <li>Using specific examples rather than global judgments</li>
              <li>
                Decreasing the frequency of bringing them up in conversation
              </li>
            </ul>
          </>
        );

      case "costly-guides-plans":
        return (
          <>
            <p>
              The breakup recovery industry has exploded in recent years, with
              countless programs promising to help you heal faster or even win
              back your ex. Understanding how to evaluate these offerings can
              protect you during a vulnerable time.
            </p>
            <h2>The Breakup Recovery Market</h2>
            <p>The commercial landscape includes several types of products:</p>
            <ul>
              <li>"Get Your Ex Back" programs ($50-500)</li>
              <li>Breakup recovery courses and systems ($30-300)</li>
              <li>Breakup coaches and consultants ($100-300/hour)</li>
              <li>Apps and subscription services ($5-30/month)</li>
              <li>Books and workbooks ($10-30)</li>
            </ul>
            <h2>Red Flags in Commercial Programs</h2>
            <p>Be cautious of programs that:</p>
            <ul>
              <li>
                Guarantee specific outcomes ("Get your ex back in 30 days!")
              </li>
              <li>Claim to have a "secret" or "little-known" technique</li>
              <li>Use manipulative tactics to exploit desperation</li>
              <li>Lack transparency about the creator's credentials</li>
              <li>
                Rely heavily on testimonials without evidence-based approaches
              </li>
              <li>Create artificial scarcity ("Only 5 spots left!")</li>
            </ul>
            <h2>Making Informed Decisions</h2>
            <p>If you're considering purchasing support:</p>
            <ul>
              <li>Research the creator's background and expertise</li>
              <li>Look for approaches aligned with psychological research</li>
              <li>Check for money-back guarantees or free trial periods</li>
              <li>
                Consider free resources first (community forums, library books,
                university resources)
              </li>
              <li>Wait at least a week before purchasing anything expensive</li>
            </ul>
          </>
        );

      case "youre-not-alone":
        return (
          <>
            <p>
              When going through a breakup, the experience can feel intensely
              isolating—as if no one else truly understands the depth of your
              pain. Yet at this very moment, countless others are experiencing
              similar struggles and seeking the same healing you are.
            </p>
            <h2>The Universality of Breakup Pain</h2>
            <p>
              Consider these statistics that place your experience in context:
            </p>
            <ul>
              <li>
                The average adult experiences 2-5 significant breakups before
                finding a lasting partnership
              </li>
              <li>
                Over 60% of people rate their worst breakup as one of the most
                painful experiences of their life
              </li>
              <li>
                About 85% of people report symptoms of grief following the end
                of a significant relationship
              </li>
              <li>
                Breakup recovery resources receive millions of searches each
                month
              </li>
            </ul>
            <h2>The Healing Power of Shared Experience</h2>
            <p>
              Understanding that your experience is shared by many others offers
              several benefits:
            </p>
            <ul>
              <li>Normalizes your emotional responses</li>
              <li>Reduces shame about struggling to move on</li>
              <li>
                Provides perspective on the temporary nature of acute pain
              </li>
              <li>
                Creates opportunities for connection with others who understand
              </li>
            </ul>
            <h2>Finding Your Recovery Community</h2>
            <p>Consider connecting with others on similar journeys through:</p>
            <ul>
              <li>Moderated online forums focused on breakup recovery</li>
              <li>
                Local support groups (many offered free through community
                centers)
              </li>
              <li>
                Shared activity groups that create connection without requiring
                emotional disclosure
              </li>
              <li>
                Friends who have successfully navigated their own breakup
                journeys
              </li>
            </ul>
            <p>
              Remember that while everyone's relationship and breakup are
              unique, the core emotional experience is profoundly human and
              shared across cultures, ages, and relationship types.
            </p>
          </>
        );

      default:
        // If article ID doesn't match any specific case, show error message
        return (
          <>
            <p>
              Content for this article is being developed. Please check back
              later.
            </p>
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
          <p
            className="text-xl text-muted-foreground animate-slide-down"
            style={{ animationDelay: "0.1s" }}
          >
            {article.subtitle}
          </p>
        </div>
      </div>

      <div
        className="mb-8 rounded-lg overflow-hidden animate-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        <img
          src={`${article.imageUrl}?auto=format&fit=crop&w=1200&q=90`}
          alt={article.title}
          className="w-full h-auto object-cover"
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {renderArticleContent()}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t animate-fade-in">
        {prevArticle ? (
          <Link
            to={`/articles/${prevArticle.slug}`}
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full justify-start">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prevArticle.title}
            </Button>
          </Link>
        ) : (
          <div></div>
        )}

        {nextArticle && (
          <Link
            to={`/articles/${nextArticle.slug}`}
            className="w-full sm:w-auto"
          >
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
