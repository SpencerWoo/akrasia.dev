import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const MethodologyPage = () => {
  return (
    <Layout pageTitle="Methodology">
      
      <p>
        Arbitrarily we conduct three trials on each programming language :
        
        <br></br><br></br>

        <table><tr><td align="left">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) 1 Million Trials,</td><td> Numbers 1 - 10
        </td></tr><tr><td align="left">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) 1 Billion Trials,</td><td> Numbers 1 - 10
        </td></tr><tr><td align="left">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3) 1 Million Trials,</td><td> Numbers 1 - 1000
        </td></tr></table>

        <br></br><br></br>

        <table>
          <tr><td align="right">Randomization :</td><td> Randomize numbers using the language's random number generator</td></tr>
          <tr><td align="right">Frequency :</td><td> Count the number of occurances each number </td></tr>
          <tr><td align="right">Probability :</td><td> Divide the Frequency by the number of Trials </td></tr>
          <tr><td align="right">Output :</td><td> Write the each number's probability to a textfile </td></tr>
          <tr><td align="right">Statistics :</td><td> Import the textfile into Excel and calculate useful statistics, like the Q value </td></tr>
          <tr><td align="right">Graph :</td><td> Graph the results and difference from expected for visualization of data. </td></tr>
        </table>

        <br></br><br></br>

        <a href = "#">Statistical significance</a> is calculated by subtracting the actual probability from the expected probability.
        <br></br><br></br>
        <a href = "#">Variance</a> is the summation of all the squared differences divded by n-1, where n is the degrees of freedom*.
        <br></br><br></br>
        <a href = "#">Standard deviation</a> is the square root of the variance.
                  
        <br></br><br></br>
        
        The <a href = "#">Z-score</a> is 
        
        <br></br><br></br>
        We then average the Z scores of the particular language and compare across languages.
        
        <br></br><br></br><br></br><br></br>
        Completed Languages : 


        <br></br><br></br>
        For more information regarding methodology visit : <a href = "https://en.wikipedia.org/wiki/Chi-squared_test">Chi-squared test</a>
      </p>
    </Layout>
  )
}

export const Head = () => <Seo title="Methodology" />

export default MethodologyPage
