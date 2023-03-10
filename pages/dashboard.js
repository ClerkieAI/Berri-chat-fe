import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Index from "./index";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import CircularProgress from '@mui/material/CircularProgress';
import base64 from 'base64-js';
import mixpanel from 'mixpanel-browser';
import Cohere from "cohere-js";
import Link from 'next/link';


const Dashboard = () => {
  const router = useRouter();


  const currentUrl = router.asPath;
  //const { chatId } = router.query;
  console.log("curr url")
  console.log(currentUrl);
  const userEmail = currentUrl.split('/')[5];
  console.log(userEmail);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const res = await fetch(`https://shareddbstorequery-7bea-8hjw.zeet-berri.zeet.app/get_projects?user_email=${userEmail}`);
        const data = await res.json();
        setTableData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTableData();
  }, []);



  return (
    <div>



      <div className={styles.topnav}>
        <div className={styles.navlogo}>
          <a href="/">BerriAI</a>
        </div>
        <div className={styles.navlinks}>


          <a href="https://calendly.com/d/xz2-fqd-gqz/berri-ai-ishaan-krrish" target="_blank" onClick={() => {
            try {
              mixpanel.track("schedule.demo.button.clicked")
            } catch (err) {
              console.error(err)
            }
          }} className="mx-1 border-2 border-berri-yellow-base text-center p-1 sm:p-2 rounded-md"
          >
            <p className="hidden sm:block">Schedule Demo</p>
            <p className="block sm:hidden">Demo</p>
          </a>
          <a href="https://discord.com/invite/KvG3azf39U" target="_blank" className="mx-1 border-2 border-berri-yellow-base text-center p-1 sm:p-2 rounded-md">Discord</a>
          <a href="https://berri.ai/" target="_blank" className="mx-1 flex-shrink-0 bg-gradient-to-r from-berri-yellow-200 to-berri-pink-base text-center p-1.5 sm:p-2.5 rounded-md text-black">+ New App</a>



          {/*           <a className="hidden sm:block" href="https://tempslack.ishaan-jaff.repl.co/slack/install" target="_blank">
            <img
              alt="Add to Slack"
              className="mx-1 w-40 h-140"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a> */}
          <a className="block sm:hidden" href="https://tempslack.ishaan-jaff.repl.co/slack/install" target="_blank">
            <img
              alt="Slack Logo"
              width={25}
              height={25}
              src="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/Slack-mark-RGB.png"
              srcSet="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/Slack-mark-RGB.png 1x, https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/Slack-mark-RGB.png 2x"
            />
          </a>






          {/*           <a href="https://discord.com/invite/KvG3azf39U" target="_blank">Discord</a> */}
          {/*           <a href="https://github.com/ClerkieAI/berri_ai" target="_blank">GitHub</a> */}
        </div>
      </div>


      <main className={styles.main}>
        <div>
          <h1>{tableData.length} Berris for {userEmail}</h1>
        </div>

        {
          tableData.length > 0 && (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {Object.keys(tableData[0]).map((header) => (
                    <th key={header} scope="col" className="px-6 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b dark:bg-gray-800 dark:border-gray-700`}
                  >
                    {Object.values(row).map((cell, j) => (
                      <td key={j} className="px-6 py-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </main>




    </div >

  );

};

export default Dashboard;
