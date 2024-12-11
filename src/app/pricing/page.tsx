import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import { Star } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
import ProPlanView from "./_components/ProPlanView";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import UpgradeButton from "./_components/UpgradeButton";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] text-white selection:bg-blue-500/30">
      <NavigationHeader />

      <main className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text mb-6">
                Elevate Your <br /> Development Experience
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Unlock professional-grade development tools built for the next
                generation of creators.
              </p>
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative p-8 rounded-3xl bg-gradient-to-b from-[#12121a] to-[#0a0a0f] 
                transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center ring-2 ring-gray-800/60">
                  <feature.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.label}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </section>

          {/* Pricing Card */}
          <section className="relative max-w-4xl mx-auto mb-24">
            <div className="relative bg-[#12121a] p-12 rounded-3xl shadow-2xl transform transition-all duration-300">
              <div className="text-center mb-12">
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-gray-800/60 mb-6">
                  <Star className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-5xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                  Lifetime Pro Access
                </h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-2xl text-gray-400">$</span>
                  <span className="text-7xl font-extrabold text-transparent bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text">
                    39
                  </span>
                  <span className="text-xl text-gray-400">one-time</span>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Unlock the full potential of CodeCraft today!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 mb-12">
                <FeatureCategory label="Development">
                  {FEATURES.development.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>

                <FeatureCategory label="Collaboration">
                  {FEATURES.collaboration.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>

                <FeatureCategory label="Deployment">
                  {FEATURES.deployment.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                  ))}
                </FeatureCategory>
              </div>

              <div className="flex justify-center gap-4">
                          {/* @ts-ignore */}

                <SignedIn>
                  <UpgradeButton />
                </SignedIn>
                          {/* @ts-ignore */}

                <SignedOut>
                  <LoginButton />
                </SignedOut>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;
