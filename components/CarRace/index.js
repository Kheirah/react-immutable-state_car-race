import { Fragment, useState } from "react";
import { useImmer } from "use-immer";
import Winner from "../Winner";
import {
  CarButton,
  AllCarRoutes,
  DistanceHeadline,
  Distance,
  Track,
} from "./CarRace.styled";
import { initialCars, getRandomDistance } from "../../utils/utils";

const finishLine = 200;

export default function CarRace() {
  const [cars, setCars] = useState(initialCars);
  /* const [cars, updateCars] = useImmer(initialCars); */

  function moveCar(clickedCar) {
    const coveredDistance = getRandomDistance();
    console.log("clickedCar", clickedCar);
    console.log("coveredDistance", coveredDistance);

    setCars(
      cars.map((car) =>
        car === clickedCar
          ? {
              ...car,
              position: {
                ...car.position,
                x: car.position.x + coveredDistance,
                lastDistance: coveredDistance,
              },
            }
          : car
      )
    );

    /* updateCars((draft) => {
      const car = draft.find((car) => car.emoji === clickedCar.emoji);
      car.position.x += coveredDistance;
      car.position.lastDistance = coveredDistance;
    }); */
  }

  const winner = cars.find((car) => car.position.x >= finishLine);

  return (
    <>
      {winner ? (
        <Winner winner={winner} onRestart={() => setCars(initialCars)} />
      ) : (
        <AllCarRoutes finishLine={finishLine}>
          <DistanceHeadline>Last Distance</DistanceHeadline>
          {cars.map((car) => (
            <Fragment key={car.emoji}>
              <Track finishLine={finishLine}>
                <CarButton
                  onClick={() => moveCar(car)}
                  positionX={car.position.x}
                  lastDistance={car.position.lastDistance}
                  aria-label={`Move clicked car forward`}
                >
                  {car.emoji}
                </CarButton>
              </Track>
              <Distance>{car.position.lastDistance}</Distance>
            </Fragment>
          ))}
        </AllCarRoutes>
      )}
    </>
  );
}
