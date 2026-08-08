"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Gift,
  Leaf,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { Product, products } from "@/lib/products";

type CartLine = { product: Product; quantity: number };

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const productTone: Record<Product["tone"], string> = {
  gold: "toneGold",
  green: "toneGreen",
  cocoa: "toneCocoa",
  blue: "toneBlue"
};

export default function Storefront() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = useMemo(
    () => cart.reduce((total, line) => total + line.product.price * line.quantity, 0),
    [cart]
  );

  function addToCart(product: Product) {
    setCart((current) => {
      const found = current.find((line) => line.product.slug === product.slug);
      if (found) {
        return current.map((line) =>
          line.product.slug === product.slug
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function adjust(slug: string, delta: number) {
    setCart((current) =>
      current
        .map((line) =>
          line.product.slug === slug
            ? { ...line, quantity: Math.max(0, line.quantity + delta) }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  }

  return (
    <main>
      <div className="announcement">
        <span>Made in Canada</span>
        <i />
        <span>Available in the United States</span>
        <i />
        <span>Fulfilled from Los Angeles</span>
      </div>

      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Flavour Bites home">
          <Image src="/images/logo.png" alt="Flavour Bites" width={330} height={95} priority />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Our craft</a>
          <a href="#gifting" onClick={() => setMenuOpen(false)}>Gifting</a>
          <a href="#fulfillment" onClick={() => setMenuOpen(false)}>U.S. fulfillment</a>
        </nav>
        <div className="headerActions">
          <button className="iconButton menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <button className="bagButton" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={19} />
            <span>Bag</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroAmbient ambientOne" />
        <div className="heroAmbient ambientTwo" />
        <div className="heroCopy">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="overline">The Flavour Bites Signature Collection</p>
            <h1>
              A premium café moment,
              <span> made for home.</span>
            </h1>
            <p className="heroLead">
              Café-inspired beverage blends, pistachio kunafa chocolate and a beautifully curated gift experience—made in Canada and available to customers across the United States.
            </p>
            <div className="heroButtons">
              <a className="primaryButton" href="#collection">
                Explore the collection <ArrowRight size={17} />
              </a>
              <a className="textButton" href="#story">
                Discover our story <ChevronDown size={16} />
              </a>
            </div>
          </motion.div>
        </div>

    <motion.div
  className="heroStage cinematicStage"
  style={{ y: heroY, scale: heroScale }}
>
  <div className="heroSpotlight" aria-hidden="true" />
  <div className="heroGround heroGroundOne" aria-hidden="true" />
  <div className="heroGround heroGroundTwo" aria-hidden="true" />

  <motion.div
    className="heroProduct heroCollection"
    initial={{ opacity: 0, y: 55, scale: 0.92, rotate: -2 }}
    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
    transition={{
      duration: 1.05,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <Image
      className="floatingProductImage"
      src="/images/herot.png"
      alt="Flavour Bites Matcha and Golden Turmeric Latte Mix collection"
      fill
      priority
      sizes="48vw"
      style={{
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  </motion.div>
</motion.div>

        <div className="heroProof">
          <span><Check size={15} /> Premium presentation</span>
          <span><Check size={15} /> No-added-sugar latte blends</span>
          <span><Check size={15} /> Gift-ready collection</span>
        </div>
      </section>

      <section className="editorialIntro" id="story">
        <p className="overline">Slow down. Savour more.</p>
        <h2>Created for the moments that deserve to feel a little more special.</h2>
        <p>
          Flavour Bites brings together familiar comfort, thoughtful ingredients and refined presentation. Every detail is designed to turn a simple drink or dessert into a moment worth sharing.
        </p>
      </section>

      <section className="collection" id="collection">
        <div className="sectionHeading">
          <div>
            <p className="overline">Shop the signature collection</p>
            <h2>Four distinct experiences.<br />One unmistakable family.</h2>
          </div>
          <p>Explore our first U.S. collection, made in Canada and presented in U.S. dollars.</p>
        </div>

        <div className="productGrid">
          {products.map((product, index) => (
            <motion.article
              className={`productCard ${productTone[product.tone]}`}
              key={product.slug}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <button className="productVisual editorialProductVisual" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                <Image src={product.image} alt={`${product.name} ${product.subtitle}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
                <span className="viewHint">View details <ArrowRight size={15} /></span>
              </button>
              <div className="productInfo">
                <p>{product.size}</p>
                <h3>{product.name}<span>{product.subtitle}</span></h3>
                <div className="productBottom">
                  <strong>{money(product.price)}</strong>
                  <button onClick={() => addToCart(product)}>
                    Add to bag <Plus size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="productStory storyTurmeric" id="craft">
        <div className="storyVisual">
          <div className="storyGlow" aria-hidden="true" />
          <Image src="/images/turmeric-label.png" alt="Flavour Bites Golden Turmeric Latte Mix" fill sizes="55vw" />
        </div>
        <div className="storyCopy">
          <p className="overline">Golden Turmeric Latte Mix</p>
          <h2>Golden warmth,<br />made your way.</h2>
          <p>
            Flavour Bites Golden Turmeric Latte Mix combines turmeric, ginger, cinnamon, cardamom, saffron, black pepper and sea salt in a premium beverage blend with no added sugar. Prepare it with your preferred milk and sweeten to taste.
          </p>
          <ul>
            <li><Sparkles size={19} /> No added sugar</li>
            <li><Leaf size={19} /> Made in Canada</li>
            <li><Gift size={19} /> Enjoy with dairy or plant-based milk</li>
          </ul>
          <button className="storyAction" onClick={() => addToCart(products[0])}>
            Add to bag <ShoppingBag size={17} />
          </button>
        </div>
      </section>

      <section className="productStory storyMatcha">
        <div className="storyCopy">
          <p className="overline">Matcha Latte Mix</p>
          <h2>Calm energy.<br />Café-style richness.</h2>
          <p>
            Premium matcha is blended with a smooth non-dairy creamer, natural vanilla flavour and sea salt to create a balanced latte with no added sugar. Enjoy it warm, pour it over ice or sweeten it exactly the way you like.
          </p>
          <ul>
            <li><Leaf size={19} /> Premium matcha</li>
            <li><Sparkles size={19} /> Rich and creamy</li>
            <li><Gift size={19} /> Warm or iced</li>
          </ul>
          <button className="storyAction" onClick={() => addToCart(products[1])}>
            Add to bag <ShoppingBag size={17} />
          </button>
        </div>
        <div className="storyVisual">
          <div className="storyGlow" aria-hidden="true" />
          <Image src="/images/matcha-label.png" alt="Flavour Bites Matcha Latte Mix" fill sizes="55vw" />
        </div>
      </section>

      <section className="productStory storyChocolate">
        <div className="storyVisual">
          <div className="storyGlow" aria-hidden="true" />
          <Image src="/images/chocolate-packaging.png" alt="Flavour Bites Dubai Pistachio Kunafa Chocolate" fill sizes="55vw" />
        </div>
        <div className="storyCopy">
          <p className="overline">Dubai Pistachio Kunafa Chocolate</p>
          <h2>A modern classic,<br />layered with indulgence.</h2>
          <p>
            Smooth chocolate surrounds a crisp pistachio-kunafa inspired centre for a rich contrast of flavour and texture. It is made in Canada and presented as a premium treat for gifting, sharing or enjoying one square at a time.
          </p>
          <ul>
            <li><Sparkles size={19} /> Pistachio-kunafa inspired centre</li>
            <li><Leaf size={19} /> Made in Canada</li>
            <li><Gift size={19} /> Gift-ready presentation</li>
          </ul>
          <button className="storyAction" onClick={() => addToCart(products[2])}>
            Add to bag <ShoppingBag size={17} />
          </button>
        </div>
      </section>

      <section className="giftFeature" id="gifting">
        <div className="giftCopy">
          <p className="overline">The Dessert Experience Box</p>
          <h2>Three signatures.<br />One beautiful gesture.</h2>
          <p>
            Golden Turmeric Latte Mix, Matcha Latte Mix and Dubai Pistachio Kunafa Chocolate come together in a premium collection designed for celebrations, hosts, clients and the people who make everyday life sweeter.
          </p>
          <button className="primaryButton" onClick={() => addToCart(products[3])}>
            Add gift box to bag <ShoppingBag size={17} />
          </button>
        </div>
        <div className="giftVisual">
          <div className="giftSpotlight" aria-hidden="true" />
          <Image src="/images/gift-box-design.png" alt="Flavour Bites Dessert Experience Box" fill sizes="55vw" />
        </div>
      </section>

      <section className="fulfillment" id="fulfillment">
        <p className="overline">A clear path to your door</p>
        <h2>Made in Canada.<br />Available across the United States.</h2>
        <div className="fulfillmentSteps">
          <article><b>01</b><h3>Made in Canada</h3><p>Our initial collection is made and packaged under the Flavour Bites brand in Canada.</p></article>
          <article><b>02</b><h3>Offered in U.S. dollars</h3><p>Customers browse a focused U.S. collection with product details and a genuine purchase path.</p></article>
          <article><b>03</b><h3>Fulfilled from Los Angeles</h3><p>U.S. orders are handled through our authorized fulfillment arrangement in Los Angeles, California.</p></article>
        </div>
      </section>

      <footer>
        <div className="footerTop">
          <Image src="/images/logo.png" alt="Flavour Bites" width={300} height={86} />
          <h2>Indulge. Savour. Love.</h2>
        </div>
        <div className="footerGrid">
          <div><h4>Collection</h4><a href="#collection">Beverage blends</a><a href="#collection">Dubai chocolate</a><a href="#gifting">Gift experience</a></div>
          <div><h4>Information</h4><a href="#fulfillment">U.S. fulfillment</a><a href="mailto:hello@flavourbites.us">Order support</a><a href="mailto:hello@flavourbites.us">Corporate gifting</a></div>
          <div><h4>Made in Canada by</h4><p>flavourBites Inc.<br />413-2331 66 Street NW<br />Edmonton, AB T6K 4B4<br />Canada</p></div>
        </div>
        <div className="footerFine"><span>© 2026 flavourBites Inc.</span><span>flavourbites.us</span></div>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div className="modalBackdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.currentTarget === e.target && setSelected(null)}>
            <motion.div className="productModal" initial={{ y: 50, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 240 }}>
              <button className="closeButton" onClick={() => setSelected(null)}><X /></button>
              <div className="modalVisual"><Image src={selected.image} alt={`${selected.name} ${selected.subtitle}`} fill sizes="50vw" /></div>
              <div className="modalCopy">
                <p className="overline">{selected.size}</p>
                <h2>{selected.name}<span>{selected.subtitle}</span></h2>
                <strong>{money(selected.price)}</strong>
                <p>{selected.summary}</p>
                <div className="badgeRow">{selected.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
                <details open><summary>Ingredients</summary><p>{selected.ingredients}</p></details>
                <details><summary>Preparation & care</summary><p>{selected.directions}</p></details>
                <button className="primaryButton fullButton" onClick={() => { addToCart(selected); setSelected(null); }}>
                  Add to bag <ShoppingBag size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button className="cartBackdrop" aria-label="Close bag" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside className="cartDrawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 260 }}>
              <div className="cartHeader"><div><p className="overline">Your selection</p><h2>Shopping bag</h2></div><button onClick={() => setCartOpen(false)}><X /></button></div>
              <div className="cartLines">
                {cart.length === 0 ? (
                  <div className="emptyCart"><ShoppingBag size={38} /><h3>Your bag is waiting.</h3><p>Choose something memorable from the signature collection.</p><button className="primaryButton" onClick={() => setCartOpen(false)}>Explore collection</button></div>
                ) : cart.map(({ product, quantity }) => (
                  <div className="cartLine" key={product.slug}>
                    <div className="cartThumb"><Image src={product.image} alt={product.name} fill sizes="100px" /></div>
                    <div><h3>{product.name}</h3><p>{product.subtitle}</p><strong>{money(product.price)}</strong><div className="quantity"><button onClick={() => adjust(product.slug, -1)}><Minus size={14} /></button><span>{quantity}</span><button onClick={() => adjust(product.slug, 1)}><Plus size={14} /></button></div></div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && <div className="cartFooter"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes are calculated during secure checkout.</p><button className="checkoutButton">Continue to secure checkout <ArrowRight size={17} /></button><small>Checkout will be connected to the final One Stop Halal or commerce-provider purchase flow.</small></div>}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
