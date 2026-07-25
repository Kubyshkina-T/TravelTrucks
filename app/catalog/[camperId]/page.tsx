import { notFound } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { LiaMapSolid } from "react-icons/lia";
import { getCamperById, getCamperReviews } from "@/lib/api";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import BookingForm from "@/components/BookingForm/BookingForm";
import css from "@/app/catalog/[camperId]/camperPage.module.css";

type CamperDetailsPageProps = {
  params: Promise<{
    camperId: string;
  }>;
};

const engineLabels: Record<string, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

const transmissionLabels: Record<string, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

const camperFormLabels: Record<string, string> = {
  alcove: "Alcove",
  panel_truck: "Panel truck",
  fully_integrated: "Fully integrated",
  semi_integrated: "Semi integrated",
};

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  const [camper, reviews] = await Promise.all([
    getCamperById(camperId),
    getCamperReviews(camperId),
  ]);

  if (!camper) {
    notFound();
  }

  const amenities = Array.isArray(camper.amenities) ? camper.amenities : [];

  const badges: string[] = [
    transmissionLabels[camper.transmission] || camper.transmission,
    amenities.includes("ac") ? "AC" : null,
    engineLabels[camper.engine] || camper.engine,
    amenities.includes("kitchen") ? "Kitchen" : null,
    amenities.includes("radio") ? "Radio" : null,
    camperFormLabels[camper.form] || camper.form,
  ].filter((badge): badge is string => Boolean(badge));

  return (
    <section className={css.detailsPage}>
      <div className={css.detailsTop}>
        <div className={css.galleryColumn}>
          <CamperGallery
            gallery={camper.gallery ?? []}
            camperName={camper.name}
          />
        </div>

        <div className={css.infoColumn}>
          <div className={css.infoCard}>
            <h1 className={css.title}>{camper.name}</h1>

            <div className={css.meta}>
              <p className={css.rating}>
                <FaStar className={css.starIcon} />
                {camper.rating} ({camper.totalReviews} Reviews)
              </p>

              <p className={css.location}>
                <LiaMapSolid />
                {camper.location}
              </p>
            </div>

            <p className={css.price}>€{camper.price.toFixed(0)}</p>

            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.detailsCard}>
            <h2 className={css.cardTitle}>Vehicle details</h2>

            <ul className={css.badges}>
              {badges.map((badge) => (
                <li className={css.badge} key={badge}>
                  {badge}
                </li>
              ))}
            </ul>

            <ul className={css.specsList}>
              <li className={css.specsItem}>
                <span>Form</span>
                <span>{camperFormLabels[camper.form] || camper.form}</span>
              </li>

              <li className={css.specsItem}>
                <span>Length</span>
                <span>{camper.length}</span>
              </li>

              <li className={css.specsItem}>
                <span>Width</span>
                <span>{camper.width}</span>
              </li>

              <li className={css.specsItem}>
                <span>Height</span>
                <span>{camper.height}</span>
              </li>

              <li className={css.specsItem}>
                <span>Tank</span>
                <span>{camper.tank}</span>
              </li>

              <li className={css.specsItem}>
                <span>Consumption</span>
                <span>{camper.consumption}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={css.detailsBottom}>
        <h2 className={css.reviewsTitle}>Reviews</h2>

        <div className={css.bottomContent}>
          <section className={css.reviewsSection}>
            {reviews.length > 0 ? (
              <ul className={css.reviewsList}>
                {reviews.map((review) => (
                  <li className={css.reviewCard} key={review.id}>
                    <div className={css.reviewHeader}>
                      <div className={css.avatar}>
                        {review.reviewer_name.charAt(0)}
                      </div>

                      <div>
                        <p className={css.reviewerName}>
                          {review.reviewer_name}
                        </p>

                        <div className={css.stars}>
                          {Array.from({ length: 5 }, (_, index) => (
                            <FaStar
                              key={index}
                              className={
                                index < review.reviewer_rating
                                  ? css.starActive
                                  : css.starInactive
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className={css.reviewText}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={css.noReviews}>No reviews yet.</p>
            )}
          </section>

          <section className={css.bookingCard}>
            <h2 className={css.bookingTitle}>Book your campervan now</h2>

            <p className={css.bookingText}>
              Stay connected! We are always ready to help you.
            </p>

            <BookingForm camperId={camper.id} />
          </section>
        </div>
      </div>
    </section>
  );
}
