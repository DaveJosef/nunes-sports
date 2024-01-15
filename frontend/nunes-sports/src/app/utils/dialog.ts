import Swal from "sweetalert2";

export async function showWarningMessage(text: string) {
  return await Swal.fire({
    titleText: 'Houve um problema',
    toast: true,
    animation: false,
    confirmButtonColor: 'var(--color-danger)',
    timer: 5000,
    position: 'top-right',
    icon: "warning",
    text,
  });
}

export function showSuccessMessage(text: string) {
  return Swal.fire({
      titleText: 'Sucesso!',
      toast: true,
      animation: false,
      confirmButtonColor: 'var(--color-a)',
      timer: 5000,
      position: 'top-right',
      icon: "success",
      text,
  });
}

export async function prompt(text: string) {
  return await Swal.fire({
      titleText: 'Confirmar?',
      animation: false,
      confirmButtonColor: 'var(--color-danger)',
      showCancelButton: true,
      cancelButtonColor: 'var(--neutrals-b)',
      position: 'center',
      icon: "question",
      text,
  });
}
