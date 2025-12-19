"use client";

import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-3xl mb-8">A Word from Derb</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              Everything here comes from experience, not guarantees.
            </p>
            
            <p>
              Places change. Prices change. That guy who was friendly last year might have 
              moved to Casablanca. The café with the perfect rooftop? New owner. Different vibe. 
              It happens.
            </p>
            
            <p>
              Use this as a starting point, not a contract. Derb shares what he knows, 
              not what he guarantees.
            </p>
            
            <p>
              Stay curious. Stay alert. And if something feels off - bounce. 
              Trust your gut - it's smarter than any guide.
            </p>
            
            <p>
              Derb's got your back, but you've got your own feet.
            </p>
            
            <div className="border-t border-foreground/10 pt-6 mt-8">
              <p className="text-xs text-muted-foreground/60">
                Your adventure, your choices. The information provided on this site is for 
                general guidance only. We make no warranties about the accuracy, completeness, 
                or reliability of any information. Any reliance you place on such information 
                is strictly at your own risk.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
