export function AboutSection() {
  return (
    <section className="relative py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            About Thu Tides
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Our story and approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Story */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Thu Tides was born at the intersection of travel, art, and hospitality marketing.
              We saw that many boutique coastal properties struggled with limited marketing content
              and couldn&apos;t afford traditional agency rates for professional content creation.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              We created Thu Tides to solve this problem—offering boutique hotels, homestays,
              dive resorts, and liveaboards the high-quality visual content they need to stand
              out in a crowded market. Through barter or paid partnerships, we help coastal brands
              attract their ideal guests with authentic, beautiful storytelling.
            </p>
          </div>

          {/* Approach */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Our Approach
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              We create visual content that captures the natural beauty and authentic experiences
              of your brand. Our work emphasizes artistic expression that resonates with travelers—
              showcasing the unique character of each location with professional quality that
              elevates brand perception.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Beyond content creation, we leverage our Instagram following to promote travel
              destinations, giving partner brands direct exposure to an engaged audience actively
              seeking authentic coastal experiences.
            </p>
          </div>
        </div>

        {/* Why Coastal Hospitality */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-light text-gray-900 mb-6">
            Why Coastal Hospitality
          </h3>
          <p className="text-gray-600 font-light leading-relaxed">
            Coastal and diving destinations offer some of the most visually stunning travel
            opportunities. We specialize in this niche because we understand the unique visual
            language of ocean-centered hospitality—from underwater photography to aerial coastal
            views, from sunrise beach moments to the intimate character of boutique properties
            by the sea. We help you avoid generic stock photos and create content that captures
            the authentic, unique character of your location and brand.
          </p>
        </div>

        {/* Instagram Community */}
        <div className="mt-16 bg-white p-8 rounded-lg text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-5xl text-blue-600">
              share
            </span>
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Instagram Promotion & Reach
          </h3>
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            When we partner with you, your property gains exposure to our engaged audience of
            travelers and adventure seekers actively seeking authentic coastal experiences.
            We promote travel destinations through our Instagram following, providing direct
            reach to people planning their next coastal adventure.
          </p>
        </div>
      </div>
    </section>
  )
}
