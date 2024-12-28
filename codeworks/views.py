from django.shortcuts import render
from django.http import JsonResponse
import spacy, json
from unidecode import unidecode

from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt


# Inicializar spaCy
nlp = spacy.load("es_core_news_md")

failed_attempts = {}

def home(request):
    return render(request, "home/home.html")

def get_response(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")
            response = generate_response(user_message)
            return JsonResponse({"response": response})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=400)

def generate_response(message):
    normalized_message = unidecode(message.lower())
    doc = nlp(message.lower())
    if "hola" in normalized_message:
        return "¡Hola! ¿Cómo puedo ayudarte?"
    elif "precio" in normalized_message:
        return "Nuestros precios varían según el servicio. Por favor, especifícalo más."
    elif "adios" in normalized_message or "gracias" in normalized_message:
        return "¡Gracias por contactarnos! Que tengas un excelente día."
    elif any(token.lemma_ == "ayuda" for token in doc):
        return "Claro, dime cómo puedo asistirte."
    elif "desarrollo de software" in normalized_message:
        return "Ofrecemos servicios de desarrollo de software a medida. ¿Qué tipo de software necesitas?"
    elif "software" in normalized_message:
        return "Ofrecemos servicios de desarrollo de software a medida. ¿Qué tipo de software necesitas?"
    elif "mantenimiento" in normalized_message:
        return "Proveemos servicios de mantenimiento para asegurar que tu software funcione sin problemas. ¿Qué tipo de mantenimiento necesitas?"
    elif "actualizaciones" in normalized_message:
        return "Podemos ayudarte con actualizaciones de software para mantener tu sistema al día. ¿Qué software necesitas actualizar?"
    elif "rendimiento" in normalized_message:
        return "Ofrecemos servicios de optimización de rendimiento para mejorar la eficiencia de tu software. ¿En qué área necesitas mejorar el rendimiento?"
    elif "soporte tecnico" in normalized_message:
        return "Nuestro equipo de soporte técnico está disponible para ayudarte con cualquier problema. ¿Cuál es tu problema específico?"
    elif "integracion" in normalized_message:
        return "Podemos integrar tu software con otras herramientas y sistemas. ¿Qué integración necesitas?"
    elif "capacitacion" in normalized_message:
        return "Ofrecemos capacitación para que tu equipo pueda utilizar el software de manera efectiva. ¿Qué tipo de capacitación necesitas?"
    elif "consultoria" in normalized_message:
        return "Nuestros expertos pueden ofrecerte consultoría para mejorar tus procesos de desarrollo de software. ¿En qué área necesitas consultoría?"
    else:
        return "Para que podamos ayudarte puedes envíanos un correo a codeworks0101@gmail.com o un whatsapp al 3781172225 y un equipo se pondra en contacto contigo."
        



@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Configura el correo
        subject = f"Nuevo mensaje de {name}"
        body = f"Nombre: {name}\nCorreo: {email}\n\nMensaje:\n{message}"
        recipient_list = ['erickgmora92@gmail.com']  # Cambia al correo del destinatario

        send_mail(subject, body, email, recipient_list)

        return JsonResponse({'message': 'Correo enviado exitosamente, nuestro equipo se pondra en contacto contigo!'}, status=200)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
