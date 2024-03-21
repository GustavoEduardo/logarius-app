import { NzTableQueryParams } from 'ng-zorro-antd/table';

export class Helpers {
  public autoTips: Record<string, Record<string, string>> = {
    default: {
      required: 'Campo obrigatório',
    },
  };

  public montaQueryStribgBYNzTable(
    params: NzTableQueryParams,
    search?: string
  ) {
    const queryParams: string[] = [];

    if (params?.filter) {
      if (search) {
        params.filter.push({ key: 'procurar', value: search });
      }

      params.filter.forEach((obj) => {
        if (obj.key && obj.value) {
          queryParams.push(obj.key + '=' + obj.value);
        }
      });
    }

    params.filter = [];

    return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
  }

  public timeDiff(d1: any, d2: any = null) {
    if (d2 === null) {
      const currentdate = new Date();

      const months =
        Number(currentdate.getMonth() + 1) < 10
          ? '0' + (currentdate.getMonth() + 1)
          : currentdate.getMonth() + 1;

      const days =
        Number(currentdate.getDate()) < 10
          ? '0' + currentdate.getDate()
          : currentdate.getDate();

      const hours =
        Number(currentdate.getHours()) < 10
          ? '0' + currentdate.getHours()
          : currentdate.getHours();

      const minutes =
        Number(currentdate.getMinutes()) < 10
          ? '0' + currentdate.getMinutes()
          : currentdate.getMinutes();

      const seconds =
        Number(currentdate.getSeconds()) < 10
          ? '0' + currentdate.getSeconds()
          : currentdate.getSeconds();

      const datetime =
        currentdate.getFullYear() +
        '-' +
        months +
        '-' +
        days +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds;

      d2 = datetime;
    }

    const dateOne = d1.split(' ').join('T');
    const dateTwo = d2.split(' ').join('T');

    d1 = new Date(dateOne).getTime();
    d2 = new Date(dateTwo).getTime();

    const diffMilissegundos = Math.abs(d1 - d2);

    let diffSegundos = diffMilissegundos / 1000;

    diffSegundos = Number(diffSegundos);

    const h = Math.floor(diffSegundos / 3600);
    const m = Math.floor((diffSegundos % 3600) / 60);
    const s = Math.floor((diffSegundos % 3600) % 60);

    const hDisplay = h > 0 ? h + 'h ' : '';
    const mDisplay = m > 0 ? m + 'm ' : '';
    const sDisplay = s > 0 ? s + 's' : '';

    return hDisplay + mDisplay + sDisplay;
  }

  public randomUID(n: number) {
    return Math.floor(Math.random() * n) + new Date().getTime();
  }

  public maskCnpjCpf(value: string): string | null {
    if (!value) {
      return null;
    }
    const identificacao = value.replace(/[^0-9]/g, '');

    if (identificacao.length === 11) {
      return identificacao.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        '$1.$2.$3-$4'
      );
    } else if (identificacao.length === 14) {
      return identificacao.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5'
      );
    }

    return value;
  }

  public keyPressNumber(evt: KeyboardEvent) {
    const e = evt || window.event;
    const key = e.keyCode || e.which;

    if (
      (!e.shiftKey && !e.altKey && !e.ctrlKey && key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105) ||
      key === 8 ||
      key === 9 ||
      key === 13 ||
      key === 35 ||
      key === 36 ||
      key === 37 ||
      key === 39 ||
      key === 46 ||
      key === 45
    ) {
    } else {
      e.returnValue = false;
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
  }

  public formatDateDb(valor: string): string {
    const data = new Date(valor);
    let retorno = '';
    if (valor && typeof data.getMonth === 'function') {
      retorno =
        data.getFullYear() +
        '-' +
        this.monthStr(data.getMonth() + 1) +
        '-' +
        this.monthStr(data.getDate());
    } else {
      retorno = valor.toString();
    }

    return retorno;
  }

  public formatDateTimeDb(valor: string): string {
    const data = new Date(valor);
    let retorno = '';
    if (valor && typeof data.getMonth === 'function') {
      retorno =
        data.getFullYear() +
        '-' +
        this.monthStr(data.getMonth() + 1) +
        '-' +
        this.monthStr(data.getDate()) +
        ' ' +
        this.monthStr(data.getHours()) +
        ':' +
        this.monthStr(data.getMinutes()) +
        ':' +
        this.monthStr(data.getSeconds());
    } else {
      retorno = valor.toString();
    }
    return retorno;
  }

  public monthStr(mes: number): any {
    let mesStr;
    if (mes < 10) {
      mesStr = '0' + mes;
    } else {
      mesStr = mes.toString();
    }

    return mesStr;
  }

  public dataToFilter(data: any) {
    if (data && typeof data.getMonth === 'function') {
      const dia = data.getDate();
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();
      let dataToFilter: any = '';

      if (mes < 10) {
        if (dia < 10) {
          dataToFilter = ano + '-0' + mes + '-0' + dia;
        } else {
          dataToFilter = ano + '-0' + mes + '-' + dia;
        }
      } else {
        if (dia < 10) {
          dataToFilter = ano + '-' + mes + '-0' + dia;
        } else {
          dataToFilter = ano + '-' + mes + '-' + dia;
        }
      }

      return dataToFilter;
    } else {
      return false;
    }
  }

  public isValidCnpj(value: string) {
    if (!value) {
      return false;
    }

    const strCNPJ = value.replace(/[^\d]/g, '');

    if (
      strCNPJ === '00000000000000' ||
      strCNPJ === '11111111111111' ||
      strCNPJ === '22222222222222' ||
      strCNPJ === '33333333333333' ||
      strCNPJ === '44444444444444' ||
      strCNPJ === '55555555555555' ||
      strCNPJ === '66666666666666' ||
      strCNPJ === '77777777777777' ||
      strCNPJ === '88888888888888' ||
      strCNPJ === '99999999999999' ||
      strCNPJ.length !== 14
    ) {
      return false;
    }

    if (strCNPJ.length !== 14) {
      return false;
    }

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; strCNPJ.length > i; i++) {
      if (strCNPJ[i - 1] !== strCNPJ[i]) {
        aux = true;
      }
    }

    if (aux === false) {
      return false;
    }

    for (let i = 0, p1 = 5, p2 = 13; strCNPJ.length - 2 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += Number(strCNPJ[i]) * p1;
      } else {
        v1 += Number(strCNPJ[i]) * p2;
      }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (v1 !== Number(strCNPJ[12])) {
      return false;
    }

    for (let i = 0, p1 = 6, p2 = 14; strCNPJ.length - 1 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += Number(strCNPJ[i]) * p1;
      } else {
        v2 += Number(strCNPJ[i]) * p2;
      }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
    }

    if (v2 !== Number(strCNPJ[13])) {
      return false;
    }

    return true;
  }

  public isValidCPF(value: string): boolean {
    let Soma;
    let Resto;
    Soma = 0;

    if (!value) {
      return false;
    }

    if (value === '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      Soma = Soma + Number(value.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }
    if (Resto !== Number(value.substring(9, 10))) {
      return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i++) {
      Soma = Soma + Number(value.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }
    if (Resto !== Number(value.substring(10, 11))) {
      return false;
    }

    return true;
  }

  public isValidCEP(value: string): boolean {
    return value?.length === 8 ? true : false;
  }

  public isPhoneNumber(value: string): boolean {
    const match = value?.match(
      /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
    );
    return match ? true : false;
  }
}
