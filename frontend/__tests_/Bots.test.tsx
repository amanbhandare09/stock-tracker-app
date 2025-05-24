import React from "react";
import "@testing-library/jest-dom";
import Bots from "../app/admin/user/Bots";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { json } from "stream/consumers";

describe("Bots Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("Renders Buttons", () => {
    render(<Bots />);

    const runBot = screen.getByText("Run Portfolio Bot");
    const fortnightlyBot = screen.getByText("Run Fortnightly Bot");
    const stockScraperBot = screen.getByText("Run Stock Scraper Bot");
    const showHistory = screen.getByText("Show History");
    const addAmc = screen.getByText("Add Amc");
    const addMf = screen.getByText("Add Mf");
    const addStock = screen.getByText("Add Stock");
    const addFundstock = screen.getByText("Add Fundstock");

    expect(runBot).toBeInTheDocument();
    expect(fortnightlyBot).toBeInTheDocument();
    expect(stockScraperBot).toBeInTheDocument();
    expect(showHistory).toBeInTheDocument();
    expect(addAmc).toBeInTheDocument();
    expect(addMf).toBeInTheDocument();
    expect(addStock).toBeInTheDocument();
    expect(addFundstock).toBeInTheDocument();
  });

  test("Triggers bot when run button clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const runButton = screen.getByText(/Run Portfolio Bot/i);

    act(() => {
      fireEvent.click(runButton);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/rpa-bot/portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  test("Triggers fortnightly bot when button  clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const fortnightlyBotButton = screen.getByText(/Run Fortnightly Bot/i);

    fireEvent.click(fortnightlyBotButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/rpa-bot/fortnightly",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  test("Triggers stock scraper bot when button clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const stockScraperBotButton = screen.getByText(/Run Stock Scraper Bot/i);

    fireEvent.click(stockScraperBotButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/rpa-bot/stockscraper",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  test("Show History when button clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const showHistoryButton = screen.getByText(/show history/i);

    fireEvent.click(showHistoryButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/rpa-bot/history",
      {
        method: "GET",
      }
    );
  });

  test("Add Amc when button clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const addAmcButton = screen.getByText(/Add Amc/i);

    fireEvent.click(addAmcButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/data/amc",
      {
        method: "POST",
      }
    );
  });

  test("Add Mf when button clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Bots />);

    const addMfButton = screen.getByText(/Add Mf/i);

    fireEvent.click(addMfButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/data/mf", {
      method: "POST",
    });
  });
});
