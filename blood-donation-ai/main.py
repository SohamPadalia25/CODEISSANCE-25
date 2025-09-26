import os
from crewai import Agent, Task, Crew, Process, LLM
from dotenv import load_dotenv

# Note: The langchain_google_genai import is no longer needed with this setup
# from langchain_google_genai import ChatGoogleGenerativeAI

from donation_tools import check_inventory, find_compatible_donors, calculate_distance

load_dotenv()

class DonationManagementCrew:
    def __init__(self):
        # CORRECTED: Assigned the LLM to 'self.llm' to make it accessible to the whole class
        self.llm = LLM(
            model="gemini/gemini-2.5-flash", # Using the standard model name
            api_key=os.getenv("GEMINI_API_KEY")
        )

    def run(self):
        inventory_monitor_agent = Agent(
            role="Live Inventory Monitoring Agent",
            goal="Proactively monitor blood and organ inventory levels across all connected hospitals and blood banks to identify critical shortages in real-time.",
            backstory=(
                "You are an autonomous AI system integrated with hospital inventory databases. Your sole purpose is to provide "
                "up-to-the-second awareness of supply levels, ensuring that the system can react instantly to a crisis before it escalates."
            ),
            tools=[check_inventory],
            llm=self.llm, # CORRECTED: This line is now active
            verbose=True,
            allow_delegation=False
        )

        donor_matching_agent = Agent(
            role="AI-based Donor-Recipient Matching Specialist",
            goal="Autonomously match donors with recipients by analyzing medical compatibility, geographic location, and urgency in real-time.",
            backstory=(
                "You are a sophisticated AI matchmaking engine with a deep understanding of medical compatibility protocols (blood type, organ matching) "
                "and geospatial data. You process lists of potential donors and needy recipients to find optimal, life-saving pairings."
            ),
            tools=[find_compatible_donors],
            llm=self.llm, # CORRECTED: This line is now active
            verbose=True,
            allow_delegation=False
        )

        emergency_logistics_agent = Agent(
            role="Emergency SOS & Logistics Optimization Agent",
            goal="Initiate emergency outreach to matched donors and provide optimized routing suggestions to ensure the fastest possible delivery of donations.",
            backstory=(
                "You are a crisis-response AI that activates when a critical match is found. You are an expert in communication and logistics, "
                "capable of instantly alerting donors and calculating the most efficient travel routes to connect the donor with the recipient's hospital."
            ),
            tools=[calculate_distance],
            llm=self.llm, # CORRECTED: This line is now active
            verbose=True,
            allow_delegation=False
        )

        dashboard_reporting_agent = Agent(
            role="Dashboard Reporting Agent",
            goal="Compile all operational data into a single, comprehensive summary report for the live dashboard.",
            backstory=(
                "You are the central information hub. You synthesize the findings from all other agents into a clear, structured, and human-readable format "
                "that provides a complete overview of the current situation for hospital administrators."
            ),
            llm=self.llm, # CORRECTED: This line is now active
            verbose=True,
            allow_delegation=False
        )
        
        inventory_task = Task(
            description="Run a full check of the current blood and organ inventory. Identify every item that is in short supply and list the corresponding hospital.",
            expected_output="A detailed report listing all current inventory shortages, specifying the hospital, the item (e.g., 'O- blood', 'Kidney'), and the current quantity.",
            agent=inventory_monitor_agent
        )
        
        matching_task = Task(
            description=(
                "Using the list of shortages from the inventory report, find compatible and available donors for ALL urgent recipients in the system. "
                "You must check for recipients R001 through R005. For each one, use the `find_compatible_donors` tool."
            ),
            expected_output="A structured list of all possible matches. For each recipient, provide their ID, their need, and a ranked list of the top 3 closest, compatible donors.",
            agent=donor_matching_agent,
            context=[inventory_task]
        )
        
        logistics_task = Task(
            description=(
                "For each recipient-donor match identified in the previous task, generate an emergency SOS alert for the top-ranked donor. "
                "The alert must state the recipient's hospital, the required donation, and the travel distance. Frame it as an urgent, actionable message."
            ),
            expected_output="A set of emergency SOS alert messages. Each message should be clearly formatted and ready to be sent to a specific donor.",
            agent=emergency_logistics_agent,
            context=[matching_task]
        )
        
        reporting_task = Task(
            description="Consolidate the inventory shortage report, the complete list of donor matches, and all generated SOS alerts into a final, unified dashboard report. The report must be well-structured with clear headings for each section.",
            expected_output="A single, comprehensive markdown report containing three sections: 'Current Inventory Shortages', 'Top Donor Matches', and 'Generated Emergency Alerts'.",
            agent=dashboard_reporting_agent,
            context=[inventory_task, matching_task, logistics_task]
        )

        donation_crew = Crew(
            agents=[
                inventory_monitor_agent,
                donor_matching_agent,
                emergency_logistics_agent,
                dashboard_reporting_agent
            ],
            tasks=[
                inventory_task,
                matching_task,
                logistics_task,
                reporting_task
            ],
            process=Process.sequential,
            verbose=True,
            manager_llm=self.llm # CORRECTED: This line is now active
        )
        
        result = donation_crew.kickoff()
        return result

if __name__ == "__main__":
    print("## Starting Autonomous Donation Management Crew...")
    print("--------------------------------------------------")
    
    crew = DonationManagementCrew()
    final_report = crew.run()
    
    print("\n\n########################")
    print("## Crew Work Complete")
    print("########################\n")
    print("Final Dashboard Report:")
    print(final_report)