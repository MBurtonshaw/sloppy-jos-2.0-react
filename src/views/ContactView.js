export default function Contact() {
  if (window.innerWidth < 800) {
    return (
      <>
        <div class="container w-75 m-auto yellow_background">
          <h2 class="text-center pt-4">
            <strong>Pizza Extra Sloppy is What We Do</strong>
          </h2>
          <br />
          <div class="">
            <div class="Hours">
              <h4 className="text-center">Hours of Operation</h4>
              <p class="text-center">
                <span>Monday-Thursday: 11:00 AM - 10:30 PM</span>
                <br />
                <span>Friday-Saturday: 11:00 AM - 2:00 AM</span>
                <br />
              </p>
            </div>
            <div class="text-center mt-4">
              <h4 className="text-center">Phone</h4>
              <span>1-216-SLOPPY-J</span>
            </div>
            <div class="text-center p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.979148375994!2d-81.64315672653612!3d41.50472667128512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830fbae42fdaa89%3A0xb4f58c976afcbb42!2s7001%20Euclid%20Ave%2C%20Cleveland%2C%20OH%2044103!5e0!3m2!1sen!2sus!4v1722952925730!5m2!1sen!2sus"
                width="100%"
                height="150px"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div class="container w-50 m-auto yellow_background">
        <h2 class="text-center pt-4">
          <strong>Pizza Extra Sloppy is What We Do</strong>
        </h2>
        <br />
        <div class="">
          <div class="Hours">
            <h4 className="text-center">Hours of Operation</h4>
            <p class="text-center">
              <span>Monday-Thursday: 11:00 AM - 10:30 PM</span>
              <br />
              <span>Friday-Saturday: 11:00 AM - 2:00 AM</span>
              <br />
            </p>
          </div>
          <div class="text-center mt-4">
            <h4 className="text-center">Phone</h4>
            <span>1-216-SLOPPY-J</span>
          </div>
          <div class="text-center p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.979148375994!2d-81.64315672653612!3d41.50472667128512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830fbae42fdaa89%3A0xb4f58c976afcbb42!2s7001%20Euclid%20Ave%2C%20Cleveland%2C%20OH%2044103!5e0!3m2!1sen!2sus!4v1722952925730!5m2!1sen!2sus"
              width="100%"
              height="250px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
