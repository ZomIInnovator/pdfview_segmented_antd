import { Button, Segmented } from "antd";
import homebck from "../images/bckgrnd.png";
import { useNavigate, useParams } from "react-router-dom";
import { BackwardOutlined } from "@ant-design/icons";
import { useQueryRecordById } from "../core/record/query";

import { useState } from "react";


export const PdfRecord = () => {
  const { id } = useParams();

  const nvgate = useNavigate();
  const fetchById = useQueryRecordById(id);
  const [pdfile, setPdfile] = useState("");

  if (fetchById.isLoading)
    return (
      <div className="text-center font-semibold text-green-600">
        Loading pdf files
      </div>
    );

  const handleIdFile = (dindex) => {
    fetchById.data?.map((d) => setPdfile(JSON.parse(d.filepath)[dindex]));
  };
  //
  return (
    <div
      className="flex h-[95vh] bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex max-w-6xl mx-auto w-full h-full">
        <div className="py-2 px-2 border-t-4 border-t-red-800 w-full border shadow-md mt-2">
          <div className=" flex justify-between items-center">
            <div className="font-bold underline uppercase bg-lime-500 px-2 rounded-sm">
              PDF VIEW
            </div>
            <Button
              type="dashed"
              onClick={() => nvgate("/records")}
              className="bg-green-600 font-bold text-white"
            >
              <BackwardOutlined /> back
            </Button>
          </div>
          <div className="flex justify-center items-center">
            {fetchById.data?.map((x) => (
              <Segmented
                className="bg-yellow-300 hover:bg-lime-300"
                key={x.id}
                options={JSON.parse(x.pdfname)}
                onChange={(val) =>
                  handleIdFile(JSON.parse(x.pdfname).indexOf(val))
                }
                defaultValue={0}
              />
            ))}
          </div>
          <div className="mt-3">
            {pdfile === "" ? (
              <p className="text-green-400 text-center">Select pdf file name to view!</p>
            ) : (
              // eslint-disable-next-line react/jsx-no-undef
              <Iframe
                url={`https://rms.region9.dilg.gov.ph/${pdfile}`}
                className=" w-full h-[80vh]"
                display="block"
                position="relative"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
