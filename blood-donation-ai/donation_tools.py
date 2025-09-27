import json
from geopy.distance import geodesic
from crewai.tools import tool

def _calculate_distance_logic(loc1: dict, loc2: dict) -> float:
    """Helper function for distance calculation."""
    return round(geodesic((loc1['lat'], loc1['lon']), (loc2['lat'], loc2['lon'])).kilometers, 2)

@tool
def check_inventory():
    """Checks inventory levels at all hospitals from mock_data.json and reports any shortages."""
    try:
        with open('data/mock_data.json', 'r') as f:
            data = json.load(f)
        
        shortages = []
        for hospital in data['hospitals']:
            for blood_type, count in hospital['inventory']['blood'].items():
                if blood_type == 'O-' and count < 2:
                    shortages.append(f"CRITICAL SHORTAGE: {hospital['name']} has only {count} unit(s) of O- blood.")
                elif count < 3:
                    shortages.append(f"Shortage: {hospital['name']} has only {count} unit(s) of {blood_type} blood.")
            
            for organ, count in hospital['inventory']['organs'].items():
                if count == 0:
                    shortages.append(f"Shortage: {hospital['name']} has no available {organ}s.")
                    
        return shortages if shortages else "All inventory levels are adequate."
    except Exception as e:
        return f"Error checking inventory: {str(e)}"

@tool
def find_compatible_donors(recipient_id: str):
    """
    Finds compatible donors for a specific recipient based on blood type and organ needs.
    The input for this tool MUST be a single recipient ID string, for example: "R001".
    """
    try:
        with open('data/mock_data.json', 'r') as f:
            data = json.load(f)

        # Input validation
        if not isinstance(recipient_id, str):
            return "Error: recipient_id must be a string"

        recipient = next((r for r in data['recipients'] if r['id'] == recipient_id), None)
        if not recipient:
            return f"Recipient with ID {recipient_id} not found."

        hospital = next((h for h in data['hospitals'] if h['id'] == recipient['hospital_id']), None)
        if not hospital:
            return f"Hospital with ID {recipient['hospital_id']} not found."

        compatible_donors = []
        
        blood_needed = recipient['blood_type_needed']
        compatibility_rules = {
            'A+': ['A+', 'A-', 'O+', 'O-'], 'A-': ['A-', 'O-'],
            'B+': ['B+', 'B-', 'O+', 'O-'], 'B-': ['B-', 'O-'],
            'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            'AB-': ['A-', 'B-', 'AB-', 'O-'],
            'O+': ['O+', 'O-'], 'O-': ['O-']
        }

        organ_needed = recipient['organ_needed']
        if organ_needed:
            for donor in data['donors']:
                if donor['available'] and donor['organ'] == organ_needed:
                    if donor['blood_type'] in compatibility_rules.get(blood_needed, []):
                        # ✅ FIX: Use helper function directly, not the tool
                        dist = _calculate_distance_logic(loc1=donor['location'], loc2=hospital['location'])
                        compatible_donors.append({"donor": donor, "distance_km": dist})
        elif blood_needed:
            eligible_types = compatibility_rules.get(blood_needed, [])
            for donor in data['donors']:
                if donor['available'] and donor['blood_type'] in eligible_types:
                    # ✅ FIX: Use helper function directly
                    dist = _calculate_distance_logic(loc1=donor['location'], loc2=hospital['location'])
                    compatible_donors.append({"donor": donor, "distance_km": dist})
        
        compatible_donors.sort(key=lambda x: x['distance_km'])
        return compatible_donors if compatible_donors else f"No compatible donors found for {recipient_id}"
    
    except Exception as e:
        return f"Error finding compatible donors: {str(e)}"

@tool
def calculate_distance(loc1: dict, loc2: dict) -> float:
    """
    Calculates the geodesic distance in kilometers between two locations.
    Each location must be a dictionary with 'lat' and 'lon' keys.
    """
    try:
        return _calculate_distance_logic(loc1, loc2)
    except Exception as e:
        return f"Error calculating distance: {str(e)}"