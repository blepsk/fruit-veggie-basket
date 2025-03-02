"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from "@mui/material";

interface Hair {
  color: string;
  count: number;
}

interface AddressUser {
  name: string;
  postnum: string;
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false)

  const fetchApi = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/getDepartmentData");
      const rows = Object.entries(data).map(
        ([department, details]: any, index) => ({
          id: index + 1,
          department,
          male: details.male,
          female: details.female,
          ageRange: details.ageRange,
          hair: Object.entries(details.hair).map(([color, count]) => ({
            color,
            count,
          })),
          addressUser: Object.entries(details.addressUser).map(
            ([name, postnum]) => ({
              name,
              postnum,
            })
          ),
        })
      );
      setData(rows);
    } catch (error: any) {
      setErrorMessage(error.response.data.error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <div style={{ padding: "20px" }}>
        <Card>
          {loading ? (
            <LinearProgress />
          )
            : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell style={{fontWeight:800}}>Department</TableCell>
                      <TableCell style={{fontWeight:800}}>Male</TableCell>
                      <TableCell style={{fontWeight:800}}>Female</TableCell>
                      <TableCell style={{fontWeight:800}}>Age</TableCell>
                      <TableCell style={{fontWeight:800}}>Hair</TableCell>
                      <TableCell style={{fontWeight:800}}>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.male}</TableCell>
                        <TableCell>{row.female}</TableCell>
                        <TableCell>{row.ageRange}</TableCell>
                        <TableCell>
                          {row.hair.map((item: Hair, index: number) => (
                            <div key={index} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                              <div className={styles.dotStyle} style={{ backgroundColor: item.color === 'Blonde' ? '#FBF6D9' : item.color }} />
                              {`${item.color}: ${item.count}`}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {row.addressUser.map(
                            (item: AddressUser, index: number) => (
                              <div
                                key={index}
                              >{`Name : ${item.name} | Postcode : ${item.postnum}`}</div>
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>)}
        </Card>
        <Link href={"/"}>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", marginTop: "20px" }}
          >
            Go to Home
          </Button>
        </Link>
      </div>
    </>
  );
}
