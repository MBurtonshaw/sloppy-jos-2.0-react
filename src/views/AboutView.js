export default function About() {
  return (
    <>
      <div class="container">
        <div class="row p-2">
          <div class="col-lg-4 text-center">
            <img
              src="img/founderPic.png"
              alt="Joe in a cape"
              class="img-fluid founder-img"
            />
          </div>

          <div class="col-lg-8 founder-text">
            <div className="p-2">
              <h2>Our Founder</h2>
              <p>
                Sloppy Jo's Pizzeria was founded by Joe Peloso, a passionate
                pizza enthusiast from Cleveland, Ohio. From a young age, Joe had
                a deep love for pizza, spending countless hours in the kitchen
                experimenting with flavors and techniques. This passion
                eventually led him to create his signature dish, the Sloppy Jo
                Pizza – a unique twist on the classic comfort food that combines
                the hearty flavors of a traditional Sloppy Joe with the crispy,
                cheesy goodness of pizza.
              </p>
              <p>
                Joe’s vision for Sloppy Jo's Pizzeria was simple: to create a
                place where people could enjoy innovative, delicious pizzas in a
                warm and welcoming atmosphere. His dedication to quality and
                creativity is reflected in every slice, making Sloppy Jo's
                Pizzeria a beloved spot for pizza lovers near and far.
              </p>
              <p>
                Come visit us and experience the mouthwatering taste of our
                Sloppy Jo Pizza – a one-of-a-kind creation that embodies Joe's
                lifelong passion for pizza.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 text-center">
            <img src="img/joe.png" alt="oven" class="img-fluid brick-img" />
            <p>The actual Joe Peloso</p>
          </div>

          <div class="col-md-8 founder-text">
            <h2>Sloppy Jo's Developed By:</h2>
            <div class="row">
              <div class="col-xs-6 col-sm-3 text-center">
                <img
                  src="img/armour.png"
                  alt="Developer 1"
                  class="img-fluid dev-img"
                />
                <p>Matthew Armour</p>
              </div>
              <div class="col-xs-6 col-sm-3 text-center">
                <a
                  class="nonchalant"
                  href="https://verdant-cranachan-f205b0.netlify.app/"
                >
                  <img
                    src="img/matt.png"
                    alt="Developer 2"
                    class="img-fluid dev-img"
                  />
                  <p>Matt Burtonshaw</p>
                </a>
              </div>
              <div class="col-xs-6 col-sm-3 text-center">
                <img
                  src="img/andrew.png"
                  alt="Developer 3"
                  class="img-fluid dev-img"
                />
                <p>Andrew Le</p>
              </div>
              <div class="col-xs-6 col-sm-3 text-center">
                <img
                  src="img/bryan.png"
                  alt="Developer 4"
                  class="img-fluid dev-img"
                />
                <p>Bryan Stewart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
