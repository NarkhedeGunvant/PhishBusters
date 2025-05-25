const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
dotenv.config();

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const VIRUSTOTAL_API_URL = 'https://www.virustotal.com/vtapi/v2/url/report';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const scanUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        if (!VIRUSTOTAL_API_KEY) {
            throw new Error('VirusTotal API key is not configured');
        }

        const params = {
            apikey: VIRUSTOTAL_API_KEY,
            resource: url
        };

        const vtResponse = await axios.get(VIRUSTOTAL_API_URL, { params });
        const data = vtResponse.data;

        const result = {
            url: url,
            isMalicious: data.positives > 0,
            confidence: (data.positives / data.total) * 100,
            scanTime: new Date().toISOString(),
            details: {
                totalScans: data.total,
                positiveScans: data.positives,
                scanners: data.scans
            }
        };

        res.json(result);
    } catch (error) {
        console.error('Error in URL scan:', error);
        if (error.response && error.response.status === 403) {
            res.status(403).json({ error: 'Invalid VirusTotal API key' });
        } else {
            res.status(500).json({ error: 'Error processing URL scan' });
        }
    }
};

const scanEmail = async (req, res) => {
    try {
        const { emailContent } = req.body;
        if (!emailContent) {
            return res.status(400).json({ error: 'Email content is required' });
        }

        if (!GEMINI_API_KEY) {
            throw new Error('Gemini API key is not configured');
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze this email content for potential phishing indicators. Consider:
        1. Urgency or pressure tactics
        2. Grammar and spelling errors
        3. Suspicious sender addresses
        4. Requests for sensitive information
        5. Unusual links or attachments
        6. Generic greetings
        7. Threatening language
        8. Impersonation attempts
        
        Email content to analyze:
        ${emailContent}
        
        Provide a detailed analysis with:
        1. A risk score from 0-10 (0 being safe, 10 being definitely phishing)
        2. List of specific concerns found
        3. Overall assessment
        Format the risk score line as: "Risk Score: X/10"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = response.text();

        const scoreMatch = analysis.match(/Risk Score: (\d+)\/10/);
        const riskScore = scoreMatch ? parseInt(scoreMatch[1]) : 5;
        
        return res.json({
            isMalicious: riskScore > 5,
            riskScore: riskScore,
            confidence: ((10 - riskScore) / 10) * 100,
            scanTime: new Date().toISOString(),
            analysis: analysis
        });
    } catch (error) {
        console.error('Error in email scan:', error);
        if (error.message === 'Gemini API key is not configured') {
            res.status(403).json({ error: 'Gemini API key is not configured' });
        } else {
            res.status(500).json({ error: 'Error processing email scan', details: error.message });
        }
    }
};

module.exports = {
    scanUrl,
    scanEmail
};