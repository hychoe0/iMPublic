using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using InvolveMINT.API.Core.VoucherAggregate;
using Ardalis.Specification;

namespace InvolveMINT.API.Infrastructure.Data.Config.VoucherConfigurations
{
  public class LinkedVoucherOfferEntityConfiguration : IEntityTypeConfiguration<LinkedVoucherOfferEntity>
  {
    public void Configure(EntityTypeBuilder<LinkedVoucherOfferEntity> builder)
    {
      builder.HasKey(e => e.Id);

      builder.ToTable("LinkedVoucherOffer");

      builder.Property(e => e.Id)
        .HasColumnName("id")
        .HasColumnType("text")
        .IsRequired();

      builder.Property(e => e.OfferId)
        .HasColumnName("offerId")
        .HasColumnType("text");

      builder.Property(e => e.Quantity).HasColumnName("quantity");
      builder.Property(e => e.VoucherId)
        .HasColumnName("voucherId")
        .HasColumnType("text");
    }
  }
}
