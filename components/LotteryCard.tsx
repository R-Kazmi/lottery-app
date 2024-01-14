"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// icons
import {
  MdOutlineZoomIn,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import { LuClock9 } from "react-icons/lu";

function LotteryCard({ lotteryType }: { lotteryType: string }) {
  const router = useRouter();
  // local state
  const [lastFive, setLastFive] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=${lotteryType.toUpperCase()}`
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  //   last five results
  const LastFive = () => {
    return (
      <table className="w-full">
        <tbody className="text-[0.8rem] font-[500]">
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <tr>
                <td>2302130</td>
                <td className={`text-${lotteryType}`}>999999999</td>
                <td>14934</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  function convertHoursToTime(number: number): string {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <main className={`bg-${lotteryType}Light rounded-lg pt-[1rem] w-[22rem]`}>
      {data ? (
        <>
          {/* title */}
          <section
            className={`flex text-${lotteryType} items-center justify-between px-[1rem]`}
          >
            <div className="flex items-center">
              <label className="text-[1.5rem] font-[600] capitalize">
                {lotteryType}
              </label>
              <p className="text-[0.8rem] font-[500] ml-[0.7rem]">
                No {data?.roundNumber ? data.roundNumber : 0}
              </p>
            </div>
            <MdOutlineZoomIn
              size="1.5rem"
              onClick={() => setLastFive(!lastFive)}
            />
          </section>

          {/* zoom toggle */}
          {lastFive ? (
            <section className="px-[1rem] py-[0.7rem]">
              <LastFive />
            </section>
          ) : (
            <>
              {/* number */}
              <section className="flex gap-[0.6rem] mt-[1.5rem] px-[1rem]">
                {data.previousWinningticket.length > 0 ? (
                  data.previousWinningticket.map(
                    (item: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className={`rounded-full px-[0.7rem] py-[0.3rem] bg-${lotteryType}`}
                        >
                          {item}
                        </p>
                      );
                    }
                  )
                ) : (
                  <p className={`rounded-full p-[0.3rem] bg-${lotteryType}`}>
                    0
                  </p>
                )}
              </section>

              {/* winning pot */}
              <section className="mt-[1rem] flex justify-between items-center px-[1rem]">
                <p className="text-[0.8rem] font-[500]">Winning Pot</p>
                <div className="flex items-baseline">
                  <h3 className="text-[1.5rem] font-[700]">
                    {data.winningPot
                      ? data?.winningPot.toString().slice(0, 12)
                      : 0}
                  </h3>
                  <p className="text-[0.7rem] font-[500]">LUCK!</p>
                </div>
              </section>
            </>
          )}

          {/* timer */}
          <section
            className={`flex justify-between items-center bg-${lotteryType} px-[1rem] py-[0.7rem]`}
          >
            <div className="flex items-center gap-[0.7rem] text-white">
              <p className="text-[0.8rem] font-[600]">
                Next <br /> Draw
              </p>
              <h3 className="flex items-center gap-[0.4rem]">
                <LuClock9 />
                <span className="text-[1.2rem] font-[600]">
                  {data.nextDraw ? convertHoursToTime(data.nextDraw) : "00:00"}
                </span>
              </h3>
            </div>
            <button
              className={`rounded-[0.25rem] bg-white text-${lotteryType} px-[1.5rem] py-[0.4rem] text-[0.8rem] font-[600]`}
              type="button"
              onClick={() => router.push(`/login`)}
            >
              Play
            </button>
          </section>

          {/* pool dropdaown  button*/}
          <section
            onClick={() => setDropdown(true)}
            className={`flex ${
              dropdown ? "ml-4" : "justify-center"
            } py-[0.5rem]`}
          >
            {!dropdown && <MdArrowDropDown size="1.2rem" />}
            <p className="text-[0.8rem] font-[600]">Current Pool Status</p>
          </section>

          {/* dropdown */}
          {dropdown && (
            <section className="px-[1rem] flex flex-col items-end">
              <table className="w-full border-b-[1px] border-black">
                <tbody>
                  {data.poolAmount?.length > 0 ? (
                    data.poolAmount.map((item: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="text-[1rem] flex justify-between"
                        >
                          <td>{item.coinName}</td>
                          <td>
                            {item.poolAmount} {item.coinSymbol}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="text-[1rem] flex justify-between">
                      <td>INAE</td>
                      <td>00INAE</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex items-baseline mt-[0.7rem]">
                <h3 className="text-[1.5rem] font-[700]">
                  {data.currentPool
                    ? data.currentPool.toString().slice(0, 12)
                    : "000"}
                </h3>
                <p className="text-[0.7rem] font-[500]">LUCK!</p>
              </div>

              <div
                onClick={() => setDropdown(false)}
                className="flex mt-[0.5rem] justify-center w-full py-[0.5rem]"
              >
                <MdArrowDropUp size="1.2rem" />
                <p className="text-[0.8rem] font-[600]">Close</p>
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </main>
  );
}

export default LotteryCard;
