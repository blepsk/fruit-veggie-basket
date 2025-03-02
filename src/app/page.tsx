"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { Button, Divider } from "@mui/material";
import Link from "next/link";

interface Item {
  type: "Fruit" | "Vegetable";
  name: string;
}

export default function Home() {
  const [defaultArray, setDefaultArray] = useState<Item[]>([
    { type: "Fruit", name: "Apple 🍎" },
    { type: "Vegetable", name: "Broccoli 🥦" },
    { type: "Vegetable", name: "Mushroom 🍄" },
    { type: "Fruit", name: "Banana 🍌" },
    { type: "Vegetable", name: "Tomato 🍅" },
    { type: "Fruit", name: "Orange 🍊" },
    { type: "Fruit", name: "Mango 🥭" },
    { type: "Fruit", name: "Pineapple 🍍" },
    { type: "Vegetable", name: "Cucumber 🥒" },
    { type: "Fruit", name: "Watermelon 🍉" },
    { type: "Vegetable", name: "Carrot 🥕" },
  ]);

  const [fruitArray, setFruitArray] = useState<Item[]>([]);
  const [veggieArray, setVeggieArray] = useState<Item[]>([]);

  const addToBusket = (item: Item) => {
    if (item.type === "Fruit") {
      setFruitArray((prevBusket) => [...prevBusket, item]);
      const newDefaultArray = defaultArray.filter(
        (fruit) => fruit.name !== item.name
      );
      setDefaultArray(newDefaultArray);
    } else if (item.type === "Vegetable") {
      setVeggieArray((prevBusket) => [...prevBusket, item]);
      const newDefaultArray = defaultArray.filter(
        (veggie) => veggie.name !== item.name
      );
      setDefaultArray(newDefaultArray);
    }
    setTimeout(() => {
      moveToDefault(item);
    }, 5000);
  };

  const moveToDefault = (item: Item) => {
    if (item.type === "Fruit") {
      setDefaultArray((prevDefault) => [...prevDefault, item]);
      setFruitArray((prevFruit) =>
        prevFruit.filter((fruit) => fruit.name !== item.name)
      );
    } else if (item.type === "Vegetable") {
      setDefaultArray((prevDefault) => [...prevDefault, item]);
      setVeggieArray((prevVeggie) =>
        prevVeggie.filter((veggie) => veggie.name !== item.name)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.list}>
          {defaultArray.map((item, index) => (
            <Button
              key={index}
              onClick={() => addToBusket(item)}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className={styles.listContainer}>
          <div className={styles.header}>Fruit</div>
          <Divider color="white"></Divider>
          <div className={styles.list}>
            {fruitArray.map((item, index) => (
              <Button
                key={index}
                onClick={() => moveToDefault(item)}
                variant="contained"
                className={styles.button}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.header}>Vegetable</div>
          <Divider color="white"></Divider>
          <div className={styles.list}>
            {veggieArray.map((item, index) => (
              <Button
                key={index}
                onClick={() => moveToDefault(item)}
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Link href={"/page2"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            margin: "5px",
          }}
        >
          Go to Page 2
        </Button>
      </Link>
      <Link href={"/api/getDepartmentData"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            margin: "5px",
          }}
        >
          API Test
        </Button>
      </Link>
    </div>
  );
}
