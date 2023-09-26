export function validateCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    var sum;
    var rest;
    sum = 0;
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

export function validateDate(date) {
    var data = date.split('/');
    var dia = data[0];
    var mes = data[1];
    var ano = data[2];

    if (data.length != 3) {
        return false;
    }

    if (data[0].length != 2 || data[1].length != 2 || data[2].length != 4) {
        return false;
    }

    if (dia < 1 || dia > 31) {
        return false;
    }

    if (mes < 1 || mes > 12) {
        return false;
    }

    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
        return false;
    }

    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) {
        return false;
    }

    if (ano < 1900) {
        return false;
    }

    return true;
}

export function validatePhone(phone) {
    phone = phone.replace(/[^\d]+/g, '');
    if (phone.length < 11) {
        return false;
    }
    return true;
}

export function validateCep(cep) {
    cep = cep.replace(/[^\d]+/g, '');
    if (cep.length < 8) {
        return false;
    }
    return true;
}

export function validatePassword(password) {
    if (password.length < 6) {
        return false;
    }
    return true;
}

export function validateConfirmPassword(password, confirmPassword) {
    if (password != confirmPassword) {
        return false;
    }
    return true;
}

export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}