const photos = [
  "./public/imgs/Good before-afters/01.jpg",
  "./public/imgs/Good before-afters/02.jpg",
  "./public/imgs/Good before-afters/03.jpg",
  "./public/imgs/Good before-afters/04a.jpg",
  "./public/imgs/Good before-afters/05.jpg",
  "./public/imgs/Good before-afters/06.jpg",
  "./public/imgs/Good before-afters/07.jpg",
  "./public/imgs/Good before-afters/08.jpg",
  "./public/imgs/Good before-afters/09.jpg",
  "./public/imgs/Good before-afters/10.jpg",
  "./public/imgs/Good before-afters/11.jpg",
  "./public/imgs/Good before-afters/12.jpg",
  "./public/imgs/Good before-afters/13.jpg",
  "./public/imgs/Good before-afters/15.jpg",
  "./public/imgs/Good before-afters/16.jpg",
  "./public/imgs/Good before-afters/17.jpg",
];

const testimonials = [
  "“I had an achy tennis elbow. I've had it for about 10 years. It's completely gone.” &#128512",
  "“Knee pain gone! I can sit criss cross applesauce for the first time in like 6 years!”",
  "“Being a very active person and playing pickleball 3-5 times a week, I developed some left hip issues. It was a deep pain/ache. After 2 weeks on the collagen, it hasn't come back!”",
  "“For about a year, my right knee has had shooting pains when I would run, lift, squat or even sometimes go down stairs. Since starting this collagen, it hasn't hurt a bit!”",
  "“5 days in I noticed the throbbing down my left leg from hip to knee gone. I could ALWAYS feel it while driving one car in particular AND after getting in bed at night. Gone...day 25 now, more pains gone little by little every day. I'm so so so happy!!”",
  "“Torn miniscus pain...almost gone. It's been killing me for 3 months. Activate collagen just 2 weeks.”",
  "“Softer skin, a glow, firm skin like my post pregnancy belly, higher metabolism, helped with weight loss.”",
  "“My nails are very strong. Don't break or chip! My knees don't hurt going up and down stairs!! My skin is softer and cellulite in my legs has disappeared!! &#10084; &#10084; &#10084;”",
  "“Love this collagen! Have tried powdered collagen but forgot about it or doesn't taste great. Have seen so many awesome improvements with this liquid collagen. Scar on my nose has diminished a lot!! Tried all kinds of scar creams with little to no change. My crepey skin on arms, neck and legs is gone!! Turkey neck gone! Definitely not going to stop using it! &#10084;”",
  "“My neck skin is so much tighter!! My skin is more hydrated!! Less wrinkles!!!”",
  "“My nails and hair are incredibly thicker! Also, my fine lines are minimized, and eye lids lifted slightly. MOST exciting, the dermatitis I had since January (horrible rash with itching burning blisters all over chin/jaw plus hundreds of bumps on forehead) is 90% GONE! I tried all sorts of things and nothing worked - I never expected the collagen to do this but I am so grateful! And my eyelashes are growing awesome too!”",
  "“Outside healthier skin, the amazing joint pain reduction.”",
];

const quoteContainer = document.querySelector("#quote");
const author = document.querySelector("#author");
const url = "https://type.fit/api/quotes";
const photoGallery = document.querySelector("#photo-gallery");
const testimonialSection = document.querySelector("#testimonials");

const numberOfPhotos = 16;
const randomPhotos = selectRandomItems(photos, numberOfPhotos);
const numberOfTestimonials = 6;
const randomTestimonials = selectRandomItems(
  testimonials,
  numberOfTestimonials
);

// Random quote generator for the front page

const getQuote = async function () {
  const randomNumber = Math.floor(Math.random() * 1000);
  const response = await fetch(url);
  const data = await response.json();

  return data[randomNumber];
};

getQuote().then((quote) => {
  quoteContainer.innerHTML = quote.text;
  if (quote.author == null) {
    return (author.innerHTML = `- Anonymous`);
  }
  author.innerHTML = ` ${quote.author}`;
});

// Random before and after photo selection for the photo gallery section

for (i = 0; i < randomPhotos.length; i++) {
  const element = document.createElement("div");
  element.setAttribute("class", "col-md-4 mt-3 col-lg-3");
  const image = document.createElement("img");

  setAttributes(image, {
    class: "img-fluid img-thumbnail",
    "data-aos": "fade",
    "data-aos-duration": "2000",
    src: randomPhotos[i],
  });
  element.appendChild(image);
  photoGallery.appendChild(element);
}

// random testimonial selection for the testimonial section
for (i = 0; i < randomTestimonials.length; i++) {
  const element = document.createElement("div");
  element.setAttribute("class", "col-md-4");
  const quote = document.createElement("blockquote");
  const quoteText = document.createElement("p");
  quoteText.innerHTML = randomTestimonials[i];

  setAttributes(quote, {
    class: "quote-border-left quote-border-right",
    "data-aos": "flip-down",
    "data-aos-duration": "1000",
  });
  setAttributes(quoteText, {
    class: "justify-text",
  });
  quote.appendChild(quoteText);
  element.appendChild(quote);
  testimonialSection.appendChild(element);
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function selectRandomItems(arr, numItems) {
  if (arr.length < numItems) {
    throw new Error(
      "The number of items to select cannot be greater than the number of items in the array"
    );
  }
  const result = [];
  const usedIndexes = {};
  while (result.length < numItems) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!usedIndexes[randomIndex]) {
      usedIndexes[randomIndex] = true;
      result.push(arr[randomIndex]);
    }
  }
  return result;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleBackToTopButton() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

window.onscroll = function () {
  toggleBackToTopButton();
};

// initialization of the animation on scroll functionality
AOS.init();
