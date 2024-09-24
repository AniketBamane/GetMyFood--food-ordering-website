import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const ExploreOption = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Explore options near me
        </h2>
        <Accordion type="single" collapsible>
          {/* Popular Cuisines */}
          <AccordionItem value="cuisines">
            <AccordionTrigger className="text-lg font-medium">
              Popular cuisines near me
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-3">
                <li className="mb-2">- Italian</li>
                <li className="mb-2">- Chinese</li>
                <li className="mb-2">- Indian</li>
                <li className="mb-2">- Mexican</li>
                <li className="mb-2">- Thai</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Popular Restaurant Types */}
          <AccordionItem value="restaurantTypes">
            <AccordionTrigger className="text-lg font-medium">
              Popular restaurant types near me
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-3">
                <li className="mb-2">- Fast Food</li>
                <li className="mb-2">- Fine Dining</li>
                <li className="mb-2">- Casual Dining</li>
                <li className="mb-2">- Cafes</li>
                <li className="mb-2">- Buffets</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Top Restaurant Chains */}
          <AccordionItem value="restaurantChains">
            <AccordionTrigger className="text-lg font-medium">
              Top Restaurant Chains
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-3">
                <li className="mb-2">- McDonald's</li>
                <li className="mb-2">- KFC</li>
                <li className="mb-2">- Domino's</li>
                <li className="mb-2">- Pizza Hut</li>
                <li className="mb-2">- Starbucks</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Cities We Deliver To */}
          <AccordionItem value="cities">
            <AccordionTrigger className="text-lg font-medium">
              Cities We Deliver To
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-3">
                <li className="mb-2">- Mumbai</li>
                <li className="mb-2">- Pune</li>
                <li className="mb-2">- Delhi</li>
                <li className="mb-2">- Bangalore</li>
                <li className="mb-2">- Hyderabad</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ExploreOption;
