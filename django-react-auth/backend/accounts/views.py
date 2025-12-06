from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer


# ------------------------------
#  /api/register/
# ------------------------------
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # Validações básicas
        if not username or not email or not password:
            return Response(
                {"error": "Campos faltando."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Usuário já existe."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email já cadastrado."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Criando usuário
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.save()

        return Response(
            {"message": "Conta criada com sucesso!"},
            status=status.HTTP_201_CREATED
        )


# ------------------------------
#  /api/login/
# (opcional: mas muito recomendado)
# ------------------------------
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response(
                {"error": "Credenciais inválidas."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Gera tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=200
        )


# ------------------------------
# /api/me/
# (mantido exatamente como estava)
# ------------------------------
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
