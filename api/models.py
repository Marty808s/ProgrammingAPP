from django.db import models
import random
import string


# Model pro objekt User
# - obsahuje id, jméno, email, heslo a datum vytvoření + check unikátnosti id
def create_id():
    len = 32
    while True:
        id_created = ''.join(random.choices(string.ascii_letters + string.digits, k=len))
        if not User.objects.filter(id=id_created).exists():
            return id_created


class User(models.Model):
    #TO:DO - šifrování hesel atd..
    id = models.CharField(max_length=32, primary_key=True, editable=False)
    name = models.CharField(max_length=32)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = create_id()
        super().save(*args, **kwargs)


class Code(models.Model):
    code_id = models.CharField(max_length=32, primary_key=True, editable=False)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')
    code = models.CharField(max_length=200)
    send_at = models.DateTimeField(auto_now_add=True)
    level = models.IntegerField(default=0) #ásledně změnit - budeme předávát přes button - zatím default
    code_output = models.CharField(max_length=200, null=True)

    def save(self, *args, **kwargs):
        if not self.code_id:
            self.code_id = create_id()
        super().save(*args, **kwargs)


class Level(models.Model):
    level_id = models.IntegerField(default=0)
    result = models.CharField(max_length=200)




